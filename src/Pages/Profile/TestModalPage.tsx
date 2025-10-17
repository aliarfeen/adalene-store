import React, { useState } from "react";
import ReusableModal from "../../Components/Forms/ReusableModal";

interface UserForm {
  username: string;
  email: string;
}

interface OrderForm {
  orderId: string;
  status: string;
}

interface ProductForm {
  name: string;
  price: number;
}

const TestModalPage: React.FC = () => {
  const [modalType, setModalType] = useState<"user" | "order" | "product" | null>(null);

  const closeModal = () => setModalType(null);

  const handleSubmit = (data: any) => {
    console.log("✅ Submitted:", data);
    alert(JSON.stringify(data, null, 2));
    closeModal();
  };

  const userFields = [
    { name: "username", label: "Username", validation: { required: "Username is required" } },
    { name: "email", label: "Email", type: "email", validation: { required: "Email is required" } },
  ];

  const orderFields = [
    { name: "orderId", label: "Order ID", validation: { required: "Order ID is required" } },
    { name: "status", label: "Status", placeholder: "Pending / Completed" },
  ];

  const productFields = [
    { name: "name", label: "Product Name", validation: { required: "Product name is required" } },
    { name: "price", label: "Price", type: "number", validation: { required: "Price is required" } },
  ];

  return (
    <div className="min-h-screen bg-[#fdf5ef] flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold mb-4">Reusable Modal Test</h1>

      <div className="flex gap-4">
        <button
          onClick={() => setModalType("user")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add User
        </button>
        <button
          onClick={() => setModalType("order")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Add Order
        </button>
        <button
          onClick={() => setModalType("product")}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
        >
          Add Product
        </button>
      </div>

      {modalType === "user" && (
        <ReusableModal
          isOpen
          onClose={closeModal}
          title="Add New User"
          fields={userFields}
          onSubmit={handleSubmit}
        />
      )}

      {modalType === "order" && (
        <ReusableModal
          isOpen
          onClose={closeModal}
          title="Add New Order"
          fields={orderFields}
          onSubmit={handleSubmit}
        />
      )}

      {modalType === "product" && (
        <ReusableModal
          isOpen
          onClose={closeModal}
          title="Add New Product"
          fields={productFields}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default TestModalPage;
