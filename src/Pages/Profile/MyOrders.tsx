import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../../Components/Common/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Order } from "../../Types/Order";
import type { User } from "../../Types/User";

const API_URL = "https://68e4f1f88e116898997db023.mockapi.io/data";

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const stored = localStorage.getItem("loggedUser");
      if (!stored) {
        toast.error("⚠️ Please log in to view your orders");
        setLoading(false);
        return;
      }

      try {
        const user: User = JSON.parse(stored);
        const response = await axios.get<Order[]>(API_URL);

        // ✅ فلترة الطلبات الخاصة بالمستخدم الحالي
        const userOrders = response.data.filter(
          (item: any) =>
            (item.resource?.toLowerCase?.() === "order") &&
            Number(item.userId) === Number(user.id)
        );

        setOrders(userOrders);

        if (userOrders.length === 0) {
          toast.info("📭 You have no orders yet.");
        }
      } catch (error) {
        console.error(error);
        toast.error("❌ Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <ToastContainer position="top-right" autoClose={2000} />

      <h3 className="text-2xl font-semibold text-[#4a2b0b] mb-4">My Orders</h3>

      {loading ? (
        <div className="text-center text-gray-500">Loading your orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-gray-400 italic mt-10">
          No orders found.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div
              key={o.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-[#f0e6df]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">
                    Order ID: <span className="font-mono">{o.id}</span>
                  </div>

                  <div className="font-semibold text-[#4a2b0b] text-lg">
                    {o.items.slice(0, 2).map((it) => it.title).join(" • ")}
                  </div>

                  <div className="text-xs text-gray-500 mt-1">
                    {/* ✅ استخدم orderQuantity بدل quantity */}
                    {o.items.reduce(
                      (sum, it) => sum + (it.orderQuantity || 1),
                      0
                    )}{" "}
                    items • Total:{" "}
                    <span className="font-semibold">
                      ${Number(o.total).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="text-sm text-gray-400">{o.date}</div>
                  <Button
                    onClick={() => console.log("View order", o.id)}
                    text="View Order"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
