

import Table from "../../Components/Table/Table";
import { Pencil, Trash2 } from "lucide-react";

type Product = {
    id: number;
    name: string;
    category: string;
    price: string;
    amount: number;
    status: "Active" | "Out of Stock";
};

const products: Product[] = [
    { id: 1, name: "bag1", category: "bag1", price: "129$", amount: 5, status: "Out of Stock" },
    { id: 2, name: "bag2", category: "bag2", price: "100$", amount: 3, status: "Active" },
];

const Products = () => {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Products</h1>
            <Table<Product>
                data={products}
                columns={[
                    { key: "name", header: "Product" },
                    { key: "category", header: "Category" },
                    { key: "price", header: "Price" },
                    { key: "amount", header: "Amount" },
                    {
                        key: "status",
                        header: "Status",
                        render: (product) => (
                            <span
                                className={`px-2 py-1 rounded text-white text-xs font-medium ${product.status === "Active" ? "bg-green-600" : "bg-red-500"
                                    }`}
                            >
                                {product.status}
                            </span>
                        ),
                    },
                    {
                        key: "actions",
                        header: "Actions",
                        render: (product:Product) => (
                            <div className="flex items-center gap-3">
                                <button onClick={() => console.log("Edit", product.id)} className="text-orange-700 hover:text-orange-900">
                                    <Pencil size={18} />
                                </button>
                                <button onClick={() => console.log("Delete", product.id)} className="text-brown-700 hover:text-brown-900">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ),
                    },
                ]}
            />
        </div>
    );
};

export default Products;
