import React, { useEffect, useState } from "react";
import { Button } from "../../Components/Common/Button";
import Table from "../../Components/Table/Table";
import type { Order } from "../../Types/Order";
import { useNavigate , useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

    useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page") || "1", 10);
    setCurrentPage(page);
  }, [location.search]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const nextPage = () => currentPage < totalPages && setCurrentPage((p) => p + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage((p) => p - 1);

  // ✅ Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://68e4f1f88e116898997db023.mockapi.io/data");
        const data = await res.json();

        const normalizedData = Array.isArray(data) ? data : [data];
        const onlyOrders = normalizedData.filter((item) => item?.resource === "Order");

        setOrders(onlyOrders);
        setFilteredOrders(onlyOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // ✅ Optimistic update for status
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        String(order.id) === String(orderId)
          ? { ...order, status: newStatus as Order["status"] }
          : order
      )
    );
    setFilteredOrders((prev) =>
      prev.map((order) =>
        String(order.id) === String(orderId)
          ? { ...order, status: newStatus as Order["status"] }
          : order
      )
    );

    try {
      const res = await fetch(
        `https://68e4f1f88e116898997db023.mockapi.io/data/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) throw new Error("Failed to update status");
      toast.success(`Order ${orderId} updated to "${newStatus}"`, { autoClose: 1500 });
    } catch (err) {
      console.error("❌ Error updating order:", err);
      toast.error("Failed to update order status!", { autoClose: 2000 });

      // rollback UI if failed
      setOrders((prev) =>
        prev.map((order) =>
          String(order.id) === String(orderId)
            ? { ...order, status: "pending" }
            : order
        )
      );
      setFilteredOrders((prev) =>
        prev.map((order) =>
          String(order.id) === String(orderId)
            ? { ...order, status: "pending" }
            : order
        )
      );
    }
  };

  // ✅ Filtering logic
  useEffect(() => {
    let filtered = orders;
    const term = searchTerm.toLowerCase();

    if (term) {
      filtered = filtered.filter(
        (order) =>
          order.id.toString().toLowerCase().includes(term) ||
          order.paymentMethod?.toLowerCase().includes(term) ||
          order.date?.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (order) => (order.status?.toLowerCase() || "") === statusFilter.toLowerCase()
      );
    }

    setFilteredOrders(filtered);
    setCurrentPage(1); // إعادة الصفحة للأولى عند فلترة جديدة
  }, [searchTerm, statusFilter, orders]);

// ✅ Table data
const tableData = currentOrders.length
  ? currentOrders.map((o) => ({
      id: o.id,
      customer: o.userinfo?.fullName ?? "",
      paymentMethod: o.paymentMethod,
      total: o.total,
      status: (
        <select
          value={o.status}
          onChange={(e) => updateOrderStatus(o.id, e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 bg-white focus:ring-2 focus:ring-[#a25a2a]"
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      ),
      date: o.date,
      action: (
        <Button
          onClick={() => navigate(`/admin/orderstable/${o.id}?page=${currentPage}`)}
          text="View Details"
        />
      ),
    }))
  : [
      {
        id: "",
        customer: "No matching orders found",
        paymentMethod: "",
        total: "",
        status: "",
        date: "",
        action: "",
        isEmpty: true, 
      },
    ];

// ✅ Columns
const columns = [
  { key: "id", header: "ID" },
  {
    key: "customer",
    header: "Customer",
    render: (row: any) =>
      row.isEmpty ? (
        <td className="text-center italic text-gray-500" colSpan={7}>
          {row.customer}
        </td>
      ) : (
        row.customer
      ),
  },
  { key: "paymentMethod", header: "Payment" },
  { key: "total", header: "Total ($)" },
  { key: "status", header: "Status" },
  { key: "date", header: "Date" },
  { key: "action", header: "Action" },
];



  if (loading)
    return <div className="p-6 text-center text-gray-500">Loading orders...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-brown-600 mb-4">
        Orders Management
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row flex-wrap justify-between items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="Search by ID, Payment Method, or Date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#a25a2a]"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#a25a2a]"
        >
          <option value="All">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <Table data={tableData} columns={columns} />

      {/* Pagination */}
      {filteredOrders.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
