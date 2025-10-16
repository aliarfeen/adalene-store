import React, { useEffect, useState } from "react";
import type { User } from "../../Types/User"; // if needed
import axios from "axios";

type Order = {
  id: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  createdAt?: string;
};

const MOCK_API_ORDERS = ""; // if you have API: put it here, else we'll use local mock

const sampleOrders: Order[] = [
  {
    id: "ORD-1001",
    items: [{ name: "Classic Sunglasses", qty: 1, price: 89.99 }, { name: "Case", qty: 1, price: 9.99 }],
    total: 99.98,
    createdAt: "2025-10-01",
  },
  {
    id: "ORD-1002",
    items: [{ name: "Cotton T-Shirt", qty: 2, price: 25 }, { name: "Sticker", qty: 1, price: 2 }],
    total: 52,
    createdAt: "2025-08-19",
  },
  {
    id: "ORD-1003",
    items: [{ name: "Leather Boots", qty: 1, price: 159.99 }],
    total: 159.99,
    createdAt: "2025-06-12",
  },
];

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // if you have a real endpoint to get orders, fetch here.
    // otherwise use sampleOrders for UI.
    if (MOCK_API_ORDERS) {
      axios.get<Order[]>(MOCK_API_ORDERS).then((r) => setOrders(r.data)).catch(() => setOrders(sampleOrders));
    } else {
      setOrders(sampleOrders);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold text-[#4a2b0b] mb-4">My Orders</h3>

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-white rounded-lg p-4 shadow-sm border border-[#f0e6df]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Order ID: <span className="font-mono">{o.id}</span></div>
                <div className="font-semibold text-[#4a2b0b] text-lg">{o.items.slice(0, 2).map(it => it.name).join(" • ")}</div>
                <div className="text-xs text-gray-500 mt-1">{o.items.reduce((s, it) => s + it.qty, 0)} items • Total: <span className="font-semibold">${o.total.toFixed(2)}</span></div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="text-sm text-gray-400">{o.createdAt}</div>
                <button
                  onClick={() => console.log("View order", o.id)}
                  className="px-4 py-2 bg-[#a25a2a] text-white rounded-md"
                >
                  View Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
