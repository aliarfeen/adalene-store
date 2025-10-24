import React, { useEffect, useState } from "react";
// import axios from "axios";
import { Button } from "../../Components/Common/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import type { Order } from "../../Types/Order";
import type { User } from "../../Types/User";
import Pagination from "../../Components/Products/Pagination";
import apiFactory from "../../Api/apiFactory";

// const API_URL = "https://68e4f1f88e116898997db023.mockapi.io/data";

const MyOrders: React.FC = () => {


  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigate = useNavigate();

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
        // const response = await axios.get<Order[]>(API_URL);
        const response = await apiFactory.fetchOrders();;

        // ✅ فلترة الطلبات الخاصة بالمستخدم الحالي
        const userOrders = response.filter(
          (item: any) =>
            (item.resource?.toLowerCase?.() === "order") &&
            Number(item.userId) === Number(user.id)
        );

        setOrders(userOrders);
        setFilteredOrders(userOrders);

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

    // Filter logic
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = orders.filter(
      (o) =>
        o.id.toString().includes(term) ||
        o.date?.toLowerCase().includes(term) ||
        o.total?.toString().includes(term)
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  
  //pagination
  
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(4)

  const lastIndex = currentPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const currentItems = filteredOrders.slice(firstIndex, lastIndex)
 //end of pagination 
  return (
    <div className="max-w-4xl mx-auto">
      <ToastContainer position="top-right" autoClose={2000} />

      <h3 className="text-2xl font-semibold text-[#4a2b0b] mb-4">My Orders</h3>
      
      {/* Filter input */}
      <div className="mb-6 flex justify-end">
        <input
          type="text"
          placeholder="Filter by ID, Date or Total..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-[#a25a2a]"
        />
      </div>
    

      {loading ? (
        <div className="text-center text-gray-500">Loading your orders...</div>
      ) :  filteredOrders.length === 0 ? (
        <div className="text-center text-gray-400 italic mt-10">
          No orders found.
        </div>
      ) : (
        <div className="space-y-4">
          {currentItems.map((o) => (
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
                    Qty • Total:{" "}
                    <span className="font-semibold">
                      ${Number(o.total).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="text-sm text-gray-400">{o.date}</div>
                  <Button
                    onClick={() => navigate(`/profile/myorder/${o.id}`)}
                    text="View Order"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination
        totalitems={filteredOrders.length}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default MyOrders;
