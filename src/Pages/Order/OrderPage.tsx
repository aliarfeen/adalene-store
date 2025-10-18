// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import apiFactory from "../../Api/apiFactory"; // ✅ استدعاء الـ factory
// import type { Order } from "../../Types"; // ✅ استدعاء الـ Type
// import { Button } from "../../Components/Common/Button";

// const OrderReview: React.FC = () => {
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   // download orders from API
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const data = await apiFactory.fetchResource<Order>("Order");
//         setOrders(data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600">
//         Loading orders...
//       </div>
//     );
//   }

//   if (!orders.length) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600">
//         No order found.
//       </div>
//     );
//   }
//use last order
//   const lastOrder = orders[orders.length - 1];
//   const { userinfo, items, total, paymentMethod } = lastOrder;

//   return (
//     <div className="bg-gray-50 min-h-screen p-4 md:p-8">
//       <div className="max-w-4xl mx-auto space-y-6">

//         {/* Shipping To */}
//         <div className="bg-white rounded-lg shadow p-6 flex justify-between items-start">
//           <div>
//             <h4 className="text-sm font-semibold text-gray-600 mb-1">Shipping To</h4>
//             <p className="font-bold text-gray-800">{userinfo.fullName}</p>
//             <p className="text-sm text-gray-600 mt-1">{userinfo.address}</p>
//             <p className="text-sm text-gray-600">{userinfo.city}</p>
//             <p className="text-sm text-gray-600">{userinfo.postalCode}</p>
//             <p className="text-sm text-gray-600 mt-1">{userinfo.phone}</p>
//           </div>
//           <button
//             onClick={() => navigate("/checkout")}
//             className="text-blue-600 text-sm hover:underline"
//           >
//             Edit
//           </button>
//         </div>

//         {/* Items */}
//         <div className="bg-white rounded-lg shadow p-6 flex justify-between items-start">
//           <div className="flex flex-col gap-3">
//             <h4 className="text-sm font-semibold text-gray-600">Item(s)</h4>

//             {items.map((item) => (
//               <div key={item.id} className="flex gap-4 mt-2">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-20 h-20 object-cover rounded-md border"
//                 />
//                 <div>
//                   <p className="font-semibold text-gray-800">{item.title}</p>
//                   <p className="text-sm text-gray-600">SKU: {item.id}</p>
//                   <p className="text-sm text-gray-600">Price: ${item.price}</p>
//                   <p className="text-sm text-gray-600">Quantity: {item.orderQuantity}</p>
//                   <p className="text-sm text-gray-800 font-medium mt-1">
//                     Total: ${(item.price * item.orderQuantity).toFixed(2)}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">
//                     In stock and ready to ship
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={() => navigate("/cart")}
//             className="text-blue-600 text-sm hover:underline"
//           >
//             Edit
//           </button>
//         </div>

//         {/* Shipping Method */}
//         <div className="bg-white rounded-lg shadow p-6 flex justify-between items-start">
//           <div>
//             <h4 className="text-sm font-semibold text-gray-600 mb-1">
//               Shipping Method
//             </h4>
//             <p className="text-gray-800">Standard: $6.00</p>
//             <p className="text-sm text-gray-600">
//               Arrives: Fri, 4/19 – Tue, 4/23
//             </p>
//           </div>
//           <button className="text-blue-600 text-sm hover:underline">Edit</button>
//         </div>

//         {/* Contact Information */}
//         <div className="bg-white rounded-lg shadow p-6 flex justify-between items-start">
//           <div>
//             <h4 className="text-sm font-semibold text-gray-600 mb-1">
//               Contact Information
//             </h4>
//             <p className="text-gray-800">Email: {userinfo.email}</p>
//           </div>
//           <button
//             onClick={() => navigate("/checkout")}
//             className="text-blue-600 text-sm hover:underline"
//           >
//             Edit
//           </button>
//         </div>

//         {/* Payment Method */}
//         <div className="bg-white rounded-lg shadow p-6 flex justify-between items-start">
//           <div>
//             <h4 className="text-sm font-semibold text-gray-600 mb-1">
//               Payment Method
//             </h4>
//             <p className="text-gray-800 capitalize">
//               {paymentMethod === "cash"
//                 ? "Cash on Delivery"
//                 : paymentMethod === "card"
//                 ? "Credit / Debit Card"
//                 : "PayPal"}
//             </p>
//           </div>
//           <button className="text-blue-600 text-sm hover:underline">Edit</button>
//         </div>

//         {/* Total Summary */}
//         <div className="bg-white rounded-lg shadow p-6 flex justify-between text-gray-800 font-semibold">
//           <span>Order Total</span>
//           <span>${(total + 6).toFixed(2)}</span>
//         </div>

//         <div className="text-center mt-8">
//           <Button
//             onClick={() => navigate("/")}
//             className=" px-8 rounded-lg transition-all"
//             text="Confirm & Continue"
//           />
           
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderReview;



import React, { useEffect, useState } from "react";
import apiFactory from "../../Api/apiFactory";
import type { Order } from "../../Types";
import { FiSearch, FiEye, FiTrash2 } from "react-icons/fi";
import { number } from "zod";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ Fetch Orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await apiFactory.fetchResource<Order>("Order");
        console.log("Fetched Orders:", data); 
        setOrders(Array.isArray(data) ? data.reverse() : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const name = order?.userinfo?.fullName?.toLowerCase() || "";
    const email = order?.userinfo?.email?.toLowerCase() || "";
    const id = String(order?.id || "");
    const term = searchTerm.toLowerCase();
    return name.includes(term) || email.includes(term) || id.includes(term);
  });

  //Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  //Delete Order
  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await apiFactory.updateOrder("Order"); // أو استخدم delete لو عندك endpoint
      setOrders(orders.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  //View Order Details
  const handleViewDetails = (order: Order) => {
    alert(`
Order #${order?.id || "N/A"}
Name: ${order?.userinfo?.fullName || "Unknown"}
Email: ${order?.userinfo?.email || "N/A"}
Total: $${order?.total?.toFixed(2) || "0.00"}
Payment: ${order?.paymentMethod || "N/A"}
Items: ${order?.items?.length || 0}
`);
  };
     //order status
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "denied":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Orders Management
      </h1>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-md">
        <FiSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email, or ID..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f0d7cc] outline-none"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No orders found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600">#</th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  Customer
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  Total
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  Payment
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="p-4 text-sm font-semibold text-gray-600 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order, index) => (
                <tr
                  key={order?.id || index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">{startIndex + index + 1}</td>
                  <td className="p-4 font-semibold">
                    {order?.userinfo?.fullName || "Unknown"}
                  </td>
                  <td className="p-4 text-sm">
                    {order?.userinfo?.email || "N/A"}
                  </td>
                  <td className="p-4 font-medium">
                    ${order?.total?.toFixed(2) || "0.00"}
                  </td>
                  <td className="p-4 capitalize">
                    {order?.paymentMethod || "N/A"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        (order as any)?.status || "pending"
                      )}`}
                    >
                      {(order as any)?.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {order?.date || "N/A"}
                  </td>
                  <td className="p-4 text-center flex justify-center gap-3">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                      title="View Details"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => handleDelete(order?.id || "")}
                      className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
                      title="Delete Order"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === i + 1
                  ? "bg-[#f0d7cc] border-[#e2bca9]"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

