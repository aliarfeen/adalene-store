import React, { useState, useMemo, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import useProducts from "../../hooks/useProducts";
import Table from "../../Components/Table/Table";
import ReusableModal from "../../Components/Forms/ReusableModal";
import type { Product } from "../../Types/";
import { toast } from "react-toastify";
import  {z, ZodNumber, ZodString, type ZodTypeAny} from "zod";
import { useForm, type RegisterOptions } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiFactory from "../../Api/apiFactory";

// 🔹 Form fields type (basic for demo)
// type ProductFormData = {
//   title: string;
//   category: string;
//   image: string;
//   description: string;
//   price: number;
//   quantity: number;
// };

export const productSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title can't exceed 100 characters"),
  category: z
    .string()
    .min(1, "Category is required")
    .max(100, "Category can't exceed 100 characters"),
  image: z
    .string()
    .url("Image must be a valid URL"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description can't exceed 1000 characters"),
  // Preprocess converts string inputs like "12.99" to a number before validating
  price: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() !== "") return Number(val);
      return val;
    },
    z
      .number()
      .positive("Price must be greater than 0")
      .max(1_000_000, "Price is unreasonably large")
  ),
  // Preprocess converts string inputs like "3" to a number before validating
  quantity: z.preprocess(
    (val) => {
      if (typeof val === "string" && val.trim() !== "") return Number(val);
      return val;
    },
    z
      .number()
      .int("Quantity must be an integer")
      .nonnegative("Quantity can't be negative")
      .max(1_000_000, "Quantity is unreasonably large")
  ),
});

 type ProductFormData = z.infer<typeof productSchema>;

export const mapZodToRHF = (schema: ZodTypeAny): RegisterOptions => {
  const validation: RegisterOptions = {};

  // Check the schema's base type (string or number)
  const isString = schema instanceof ZodString;
  const isNumber = schema instanceof ZodNumber;

  // For preprocessed schemas (like 'price' and 'quantity'), get the underlying schema
  const innerSchema = (schema as any)._def?.innerType || schema;
  const checks = (innerSchema as any)._def?.checks as Array<any> || [];
  
  // 1. Handle String Constraints
  if (isString) {
    // REQUIRED: Maps z.string().min(1, 'message') or z.string().nonempty('message')
    const minCheck = checks.find(check => check.kind === 'min');
    if (minCheck && minCheck.value >= 1) {
      validation.required = minCheck.message || 'This field is required';
      
      // If 'required' is set via min(1), the RHF minLength rule should start from min(2)
      // to avoid double error messages, but we'll include minLength anyway to cover 
      // rules like min(3).
      if (minCheck.value > 1) {
         validation.minLength = {
            value: minCheck.value,
            message: minCheck.message || `Must be at least ${minCheck.value} characters`,
          };
      }
    }

    // MAX LENGTH: Maps z.string().max(N, 'message')
    const maxCheck = checks.find(check => check.kind === 'max');
    if (maxCheck) {
      validation.maxLength = {
        value: maxCheck.value,
        message: maxCheck.message || `Cannot exceed ${maxCheck.value} characters`,
      };
    }
    
    // URL/EMAIL/UUID: Maps specific string formats to a RHF pattern or validate rule.
    const urlCheck = checks.find(check => check.kind === 'url');
    if (urlCheck) {
        // You would typically use a regex here, but for simplicity, we'll use 'validate' 
        // to check it's non-empty and rely on the Zod-side validation for the URL format 
        // upon final form submission (since RHF doesn't have a built-in URL type).
        validation.validate = (value: string) => {
             // Basic check to ensure it's not empty if URL is required
             if (minCheck && minCheck.value >= 1 && value.trim() === '') {
                 return minCheck.message || 'Image URL is required';
             }
             // For complex URL/Email formats, the Zod resolver is best.
             // Manual pattern matching can be error-prone, but here's a basic URL regex:
             const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
             if (value.trim() !== '' && !urlRegex.test(value)) {
                 return urlCheck.message || 'Must be a valid URL';
             }
             return true;
        };
    }
  } 
  
  // 2. Handle Number Constraints (Applies to 'price' and 'quantity')
  else if (isNumber) {
    // REQUIRED: For number fields, RHF 'required' is needed if the field is not optional.
    // In this case, your Zod schema implicitly requires them because of the `.number()` call 
    // and the preprocess logic, which converts an empty string to NaN, failing the `.number()` check.
    // We'll set a basic 'required' based on the presence of positive/nonnegative checks.
    
    const isRequired = checks.some(check => check.kind === 'positive' || check.kind === 'nonnegative');
    if (isRequired) {
      // Find a suitable 'required' message (often comes from the first constraint)
      validation.required = checks[0]?.message || 'A value is required';
    }

    // MIN/POSITIVE/NONNEGATIVE: Maps to RHF 'min'
    const minCheck = checks.find(check => check.kind === 'min' || check.kind === 'positive' || check.kind === 'nonnegative');
    if (minCheck) {
      const minValue = minCheck.kind === 'positive' ? 0.0001 : (minCheck.kind === 'nonnegative' ? 0 : minCheck.value);
      validation.min = {
        value: minValue,
        message: minCheck.message || `Value must be at least ${minValue}`,
      };
    }

    // MAX: Maps to RHF 'max'
    const maxCheck = checks.find(check => check.kind === 'max');
    if (maxCheck) {
      validation.max = {
        value: maxCheck.value,
        message: maxCheck.message || `Value cannot exceed ${maxCheck.value}`,
      };
    }
    
    // INTEGER: Maps to RHF 'validate'
    const intCheck = checks.find(check => check.kind === 'int');
    if (intCheck) {
      const existingValidate = validation.validate;
      validation.validate = (value: number) => {
         // Run any existing validation first
         if (existingValidate && typeof existingValidate === 'function') {
             const existingResult = existingValidate(value, {});
             if (existingResult !== true) return existingResult;
         }
         
         // Custom integer check
         return Number.isInteger(Number(value)) || intCheck.message || 'Must be a whole number';
      }
    }
  }

  return validation;
};
  


const Products: React.FC = () => {
  const { products, isLoading, isError } = useProducts();

  // Filter states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [localProducts, setLocalProducts] = useState<Product[]>([]);

  // Keep local state in sync with API
  useEffect(() => {
    if (products) {
      setLocalProducts(products);
    }
  }, [products]);
  // RHF
  const titleValidation = mapZodToRHF(productSchema.shape.title as z.ZodString);
const categoryValidation = mapZodToRHF(productSchema.shape.category as z.ZodString);
const imageValidation = mapZodToRHF(productSchema.shape.image as z.ZodString);
const descriptionValidation = mapZodToRHF(productSchema.shape.description as z.ZodString);
const priceValidation = mapZodToRHF(productSchema.shape.price as unknown as z.ZodNumber); // Note: Uses the ZodNumber type
const quantityValidation = mapZodToRHF(productSchema.shape.quantity as unknown as  z.ZodNumber); // Note: Uses the ZodNumber type
  // Filter products
  const filteredProducts = useMemo(() => {
    return localProducts.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.id.toString().includes(search);

      const matchesCategory = category ? product.category === category : true;
      const matchesPrice =
        maxPrice !== "" ? product.price <= Number(maxPrice) : true;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [localProducts, search, category, maxPrice]);

  // Columns
  const columns = [
    {
      key: "image",
      header: "Image",
      render: (item: Product) => (
        <img
          src={item.image}
          alt={item.title}
          className="w-12 h-12 object-cover rounded"
        />
      ),
    },
    { key: "title", header: "Title" },
    { key: "category", header: "Category" },
    {
      key: "price",
      header: "Price",
      render: (item: Product) => `${item.price}$`,
    },
    { key: "quantity", header: "Stock" },
    {
      key: "actions",
      header: "Actions",
      render: (item: Product) => (
        <div className="flex gap-2">
          {/* Edit button */}
          <button
            onClick={() => handleEdit(item)}
            className="text-orange-500 hover:scale-110 transition"
          >
            <Pencil size={18} />
          </button>

          {/* Delete button */}
          <button
            onClick={() => handleDelete(item)}
            className="text-red-500 hover:scale-110 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  // Unique categories
  const categories = Array.from(new Set(localProducts.map((p) => p.category)));

  // 👉 Handlers
  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    //? not a good idea to add this logic 
    toast.success("Product deleted successfully!");
  };

  const handleSave = (data: ProductFormData) => {
     // 1. Perform final Zod validation check (backend safety)
        const result = productSchema.safeParse(data);
    
        if (!result.success) {
          // This should ideally not happen if RHF validation in the modal worked,
          // but it's a critical safety net.
          console.error("Zod Validation Failed:", result.error);
          toast.error(`Validation failed. Check your inputs.`);
          return;
        }
    
        const validatedData = result.data;
    
    if (isAdding) {
      const newProduct: Product = {
        id: String(Date.now()),
        title: data.title,
        category: data.category,
        price: Number(data.price),
        quantity: Number(data.quantity),
        image: data.image,
        resource: "products",
        description: data.description,
        orderQuantity: 0,
        bestSeller: false,
      };
      apiFactory.sendProduct(newProduct);
      toast.success(`${validatedData.title} Product added successfully!`);
    } else if (selectedProduct) {
        const updatedProduct = { ...validatedData, id: selectedProduct.id,  resource: selectedProduct.resource,orderQuantity: selectedProduct.orderQuantity, bestSeller: selectedProduct.bestSeller};

      apiFactory.updateProduct(updatedProduct);
      toast.success(`${validatedData.title} Product updated successfully!  `);
    }
    setIsModalOpen(false);
  };

  // Fields for modal form
  const fields = [
    { name: "title", label: "Title", type: "text", validation: titleValidation},
    { name: "category", label: "Category", type: "text", validation: categoryValidation},
    { name: "description", label: "Description", type: "text", validation: descriptionValidation},
    { name: "image", label: "Image URL", type: "text", validation: imageValidation},
    { name: "price", label: "Price", type: "number", validation: priceValidation},
    { name: "quantity", label: "Stock", type: "number", validation: quantityValidation},
  ];

  // Loading & Error
  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-brown-600 mb-4">
        Product Management
      </h2>

      {/* Filters + Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        {/* Filters */}
        <div className="flex gap-4 bg-[#f5f2ea] p-4 rounded-md w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by Title or ID"
            className="px-3 py-2 rounded-md border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="px-3 py-2 rounded-md border"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Max Price"
            className="px-3 py-2 rounded-md border"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value ? Number(e.target.value) : "")
            }
          />
        </div>

        {/* Add New Button */}
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-orange-800 hover:bg-[#5c3317] text-white px-4 py-2 rounded-lg transition"
        >
          <Plus size={18} /> Add New
        </button>
      </div>

      {/* Table */}
      <Table<Product> data={filteredProducts} columns={columns} />

      {/* Reusable Modal */}
      <ReusableModal<ProductFormData>
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        title={isAdding ? "Add New Product" : `Edit ${selectedProduct?.title}`}
        fields={fields}
        initialValues={
          isAdding
            ? { title: "", category: "", image: "", description: "", price: 0, quantity: 0 }
            : (selectedProduct as unknown as ProductFormData)
        }
      />
    </div>
  );
};

export default Products;
