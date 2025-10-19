import { useState, useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import useProducts from "../../hooks/useProducts";
import Table from "../../Components/Table/Table";
import type { Product } from "../../Types/";

const Products: React.FC = () => {
  const { products, isLoading, isError } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Failed to load products.</p>;

  // 🟢 Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.id.toString().includes(search);

      const matchesCategory = category ? product.category === category : true;

      const matchesPrice =
        maxPrice !== "" ? product.price <= Number(maxPrice) : true;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, search, category, maxPrice]);

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
    { key: "orderQuantity", header: "Orders" },
    {
      key: "bestSeller",
      header: "Best Seller",
      render: (item: Product) =>
        item.bestSeller ? (
          <span className="px-2 py-1 bg-green-500 text-white rounded text-xs">
            Yes
          </span>
        ) : (
          <span className="px-2 py-1 bg-gray-400 text-white rounded text-xs">
            No
          </span>
        ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item: Product) => (
        <div className="flex gap-2">
          <button className="text-orange-500 hover:scale-110 transition">
            <Pencil size={18} />
          </button>
          <button className="text-red-500 hover:scale-110 transition">
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  // Extract unique categories for dropdown
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-brown-600 mb-4">
        Product Management
      </h2>

      {/* Filters */}
      <div className="flex gap-4 bg-[#f5f2ea] p-4 rounded-md mb-6">
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

      <Table<Product> data={filteredProducts} columns={columns} />
    </div>
  );
};

export default Products;
