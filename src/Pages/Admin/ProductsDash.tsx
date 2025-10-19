import React, { useState, useMemo, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import useProducts from "../../hooks/useProducts";
import Table from "../../Components/Table/Table";
import ReusableModal from "../../Components/Forms/ReusableModal";
import type { Product } from "../../Types/";
import { toast } from "react-toastify";

// 🔹 Form fields type (basic for demo)
type ProductFormData = {
  title: string;
  category: string;
  price: number;
  quantity: number;
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
            onClick={() => handleDelete(item.id)}
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

  const handleDelete = (id: number | string) => {
    setLocalProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted successfully!");
  };

  const handleSave = (data: ProductFormData) => {
    if (isAdding) {
      const newProduct: Product = {
        id: String(Date.now()),
        title: data.title,
        category: data.category,
        price: Number(data.price),
        quantity: Number(data.quantity),
        image: "https://via.placeholder.com/150",
        orderQuantity: 0,
        bestSeller: false,
      };
      setLocalProducts((prev) => [...prev, newProduct]);
      toast.success("Product added successfully!");
    } else if (selectedProduct) {
      setLocalProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...data } : p
        )
      );
      toast.success("Product updated successfully!");
    }
    setIsModalOpen(false);
  };

  // Fields for modal form
  const fields = [
    { name: "title", label: "Title", type: "text" },
    { name: "category", label: "Category", type: "text" },
    { name: "price", label: "Price", type: "number" },
    { name: "quantity", label: "Stock", type: "number" },
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
            ? { title: "", category: "", price: 0, quantity: 0 }
            : (selectedProduct as unknown as ProductFormData)
        }
      />
    </div>
  );
};

export default Products;
