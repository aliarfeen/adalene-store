import React, { useState, useMemo, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import useProducts from "../../hooks/useProducts";
import Table from "../../Components/Table/Table";
import ReusableModal from "../../Components/Forms/ReusableModal";
import type { Product } from "../../Types/";
import { toast } from "react-toastify";
import { z, ZodNumber, ZodString, type ZodTypeAny } from "zod";
import { type RegisterOptions } from "react-hook-form";
import apiFactory from "../../Api/apiFactory";

// ✅ Product schema
export const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title can't exceed 100 characters"),
  category: z.string().min(1, "Category is required").max(100, "Category can't exceed 100 characters"),
  image: z.string().url("Image must be a valid URL"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description can't exceed 1000 characters"),
  price: z.preprocess(
    (val) => (typeof val === "string" && val.trim() !== "" ? Number(val) : val),
    z.number().positive("Price must be greater than 0").max(1_000_000, "Price is unreasonably large")
  ),
  quantity: z.preprocess(
    (val) => (typeof val === "string" && val.trim() !== "" ? Number(val) : val),
    z.number().int("Quantity must be an integer").nonnegative("Quantity can't be negative").max(1_000_000, "Quantity is unreasonably large")
  ),
});

type ProductFormData = z.infer<typeof productSchema>;

// ✅ Map Zod validation to RHF
export const mapZodToRHF = (schema: ZodTypeAny): RegisterOptions => {
  const validation: RegisterOptions = {};
  const isString = schema instanceof ZodString;
  const isNumber = schema instanceof ZodNumber;
  const innerSchema = (schema as any)._def?.innerType || schema;
  const checks = ((innerSchema as any)._def?.checks as Array<any>) || [];

  if (isString) {
    const minCheck = checks.find((check) => check.kind === "min");
    if (minCheck && minCheck.value >= 1) {
      validation.required = minCheck.message || "This field is required";
      if (minCheck.value > 1) {
        validation.minLength = {
          value: minCheck.value,
          message: minCheck.message || `Must be at least ${minCheck.value} characters`,
        };
      }
    }

    const maxCheck = checks.find((check) => check.kind === "max");
    if (maxCheck) {
      validation.maxLength = {
        value: maxCheck.value,
        message: maxCheck.message || `Cannot exceed ${maxCheck.value} characters`,
      };
    }

    const urlCheck = checks.find((check) => check.kind === "url");
    if (urlCheck) {
      validation.validate = (value: string) => {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        if (value.trim() !== "" && !urlRegex.test(value)) {
          return urlCheck.message || "Must be a valid URL";
        }
        return true;
      };
    }
  } else if (isNumber) {
    const isRequired = checks.some((check) => check.kind === "positive" || check.kind === "nonnegative");
    if (isRequired) validation.required = checks[0]?.message || "A value is required";

    const minCheck = checks.find((check) => check.kind === "min" || check.kind === "positive" || check.kind === "nonnegative");
    if (minCheck) {
      const minValue = minCheck.kind === "positive" ? 0.0001 : minCheck.kind === "nonnegative" ? 0 : minCheck.value;
      validation.min = { value: minValue, message: minCheck.message || `Value must be at least ${minValue}` };
    }

    const maxCheck = checks.find((check) => check.kind === "max");
    if (maxCheck) {
      validation.max = { value: maxCheck.value, message: maxCheck.message || `Value cannot exceed ${maxCheck.value}` };
    }

    const intCheck = checks.find((check) => check.kind === "int");
    if (intCheck) {
      validation.validate = (value: number) => Number.isInteger(Number(value)) || intCheck.message || "Must be a whole number";
    }
  }

  return validation;
};

// ✅ Main Component
const Products: React.FC = () => {
  const { products, isLoading, isError } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [localProducts, setLocalProducts] = useState<Product[]>([]);


  
  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  useEffect(() => {
    if (products) setLocalProducts(products);
  }, [products]);

  // Validation Mappings
  const titleValidation = mapZodToRHF(productSchema.shape.title);
  const categoryValidation = mapZodToRHF(productSchema.shape.category);
  const imageValidation = mapZodToRHF(productSchema.shape.image);
  const descriptionValidation = mapZodToRHF(productSchema.shape.description);
  const priceValidation = mapZodToRHF(productSchema.shape.price as unknown as z.ZodNumber);
  const quantityValidation = mapZodToRHF(productSchema.shape.quantity as unknown as z.ZodNumber);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return localProducts.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.id.toString().includes(search);
      const matchesCategory = category ? product.category === category : true;
      const matchesPrice = maxPrice !== "" ? product.price <= Number(maxPrice) : true;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [localProducts, search, category, maxPrice]);


    // ✅ Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Columns
  const columns = [
    {
      key: "image",
      header: "Image",
      render: (item: Product) => (
        <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded" />
      ),
    },
    { key: "title", header: "Title" },
    { key: "category", header: "Category" },
    { key: "price", header: "Price", render: (item: Product) => `${item.price}$` },
    { key: "quantity", header: "Stock" },
    {
      key: "actions",
      header: "Actions",
      render: (item: Product) => (
        <div className="flex gap-2">
          <button onClick={() => handleEdit(item)} className="text-orange-500 hover:scale-110 transition">
            <Pencil size={18} />
          </button>
          <button onClick={() => handleDelete(item)} className="text-red-500 hover:scale-110 transition">
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  // Unique categories for both filter + modal dropdown
  const categories = Array.from(new Set(localProducts.map((p) => p.category)));

  // Handlers
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
    toast.success("Product deleted successfully!");
  };

  const handleSave = (data: ProductFormData) => {
    const result = productSchema.safeParse(data);
    if (!result.success) {
      toast.error("Validation failed. Check your inputs.");
      return;
    }

    const validatedData = result.data;

    if (isAdding) {
      const newProduct: Product = {
        id: String(Date.now()),
        title: validatedData.title,
        category: validatedData.category,
        price: Number(validatedData.price),
        quantity: Number(validatedData.quantity),
        image: validatedData.image,
        resource: "products",
        description: validatedData.description,
        orderQuantity: 0,
        bestSeller: false,
      };
      apiFactory.sendProduct(newProduct);
      toast.success(`${validatedData.title} added successfully!`);
    } else if (selectedProduct) {
      const updatedProduct = {
        ...validatedData,
        id: selectedProduct.id,
        resource: selectedProduct.resource,
        orderQuantity: selectedProduct.orderQuantity,
        bestSeller: selectedProduct.bestSeller,
      };
      apiFactory.updateProduct(updatedProduct);
      toast.success(`${validatedData.title} updated successfully!`);
    }

    setIsModalOpen(false);
  };

  // ✅ Fields for modal form — Category is now a dropdown
  const fields = [
    { name: "title", label: "Title", type: "text", validation: titleValidation },
    {
      name: "category",
      label: "Category",
      type: "select", // Dropdown instead of text
      options: categories.map((cat) => ({ label: cat, value: cat })),
      validation: categoryValidation,
    },
    { name: "description", label: "Description", type: "text", validation: descriptionValidation },
    { name: "image", label: "Image URL", type: "text", validation: imageValidation },
    { name: "price", label: "Price", type: "number", validation: priceValidation },
    { name: "quantity", label: "Stock", type: "number", validation: quantityValidation },
  ];

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-brown-600 mb-4">Products Management</h2>

      {/* Filters + Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <div className="flex gap-4 bg-[#f5f2ea] p-4 rounded-md w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by Title or ID"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#a25a2a]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#a25a2a]"
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
            min={0}
            placeholder="Max Price"
            className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#a25a2a]"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : "")}
          />
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-orange-800 hover:bg-[#5c3317] text-white px-4 py-2 rounded-lg transition"
        >
          <Plus size={18} /> Add New
        </button>
      </div>

      <Table<Product> data={currentItems} columns={columns} />

            {/* ✅ Pagination Controls */}
      <div className="flex justify-center items-center gap-3 mt-6">
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>

        <span className="font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

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
