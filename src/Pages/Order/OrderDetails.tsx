import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
import type { Order } from "../../Types/Order";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "../../Components/Common/Button";
import "react-toastify/dist/ReactToastify.css";
import RatingModal from "../../Components/Profile/RatingModal";
import apiFactory from "../../Api/apiFactory";

// const API_URL = "https://68e4f1f88e116898997db023.mockapi.io/data";

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [selectedProductToRate, setSelectedProductToRate] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await apiFactory.fetchOrders();
        const allData = response;

        // ✅ نجيب الطلب المطلوب فقط من كل البيانات
        const singleOrder = allData.find(
          (item: any) => item.resource === "Order" && String(item.id) === id
        );

        if (!singleOrder) {
          toast.error("❌ Order not found");
          return;
        }

        setOrder(singleOrder);
      } catch (error) {
        console.error(error);
        toast.error("❌ Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleRateProductClick = useCallback((product: any) => {
    setSelectedProductToRate(product);
    setIsRatingModalOpen(true);
  }, []);

  const handleCloseRatingModal = useCallback(() => {
    setIsRatingModalOpen(false);
    setSelectedProductToRate(null);
  }, []);

  if (loading)
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  if (!order)
    return (
      <div className="text-center mt-10 text-gray-400 italic">
        Order not found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8 border border-[#f0e6df]">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#4a2b0b]">
          Order Details — #{order.id}
        </h2>
        <Button
          text="← Back to My Orders"
          onClick={() => navigate("/profile/myorder")}
        />
      </div>

      {/* User Info */}
      <div className="bg-[#fdf5ef] p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-3 text-[#4a2b0b]">
          Customer Information
        </h3>
        <p>
          <span className="font-semibold">Name:</span> {order.userinfo.fullName}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {order.userinfo.email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {order.userinfo.phone}
        </p>
        <p>
          <span className="font-semibold">Address:</span>{" "}
          {order.userinfo.address}, {order.userinfo.city} (
          {order.userinfo.postalCode})
        </p>
        {order.userinfo.note && (
          <p>
            <span className="font-semibold">Note:</span> {order.userinfo.note}
          </p>
        )}
      </div>

      {/* Order Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-600">
            <strong>Date:</strong> {order.date}
          </p>
        </div>
        <div>
          <p className="text-gray-600">
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>
        </div>
        <div>
          <p className="text-gray-600">
            <strong>Total:</strong> ${order.total.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-gray-600">
            <strong>Status:</strong> {order.status}
          </p>
        </div>
      </div>

      {/* Items */}
      <div>
        <h3 className="text-lg font-semibold text-[#4a2b0b] mb-3">Items</h3>
        <div
          className={`divide-y border rounded-lg ${
            order.items.length > 2 ? "max-h-80 overflow-y-auto" : ""
          }`}
        >
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-center p-3 gap-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-md border"
                />
                <div>
                  <p className="font-semibold text-[#4a2b0b]">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.orderQuantity || 1}
                  </p>
                </div>
              </div>
              <div className="text-[#4a2b0b] font-semibold">
                ${item.price.toFixed(2)}
              </div>
              {order.status === "delivered" && <Button
                onClick={() => handleRateProductClick(item)}
                text="Rate Product"
              />}
              {selectedProductToRate && (
                <RatingModal isOpen={isRatingModalOpen} onClose={handleCloseRatingModal} product={selectedProductToRate} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
