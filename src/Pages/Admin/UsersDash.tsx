import React, { useEffect, useState } from "react";
import Table from "../../Components/Table/Table";
import ReusableModal from "../../Components/Forms/ReusableModal";
import type { User } from "../../Types/User"; 



const  UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // fetch data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://68e4f1f88e116898997db023.mockapi.io/data");
        const data: User[] = await res.json();

        // get users with role=customer
        const customers = data.filter((user) => user.role === "customer");
        setUsers(customers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  // 🔍 handle search filter
  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.id.toLowerCase().includes(lowerTerm) ||
        user.username.toLowerCase().includes(lowerTerm) ||
        user.email.toLowerCase().includes(lowerTerm)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);


  // culomns name
  const columns = [
    {
      key: "id",
      header: "ID",
    },
    {
      key: "username",
      header: "Username",
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "password",
      header: "Password",
      render: (user: User) => (
        <span className="text-gray-500 italic">
          {user.password ? "••••••••" : "No Password"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (user: User) => (
         <div className="flex gap-2">
          <button
            onClick={() => handleEdit(user)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => alert(`Delete ${user.username}`)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // open modal to edit 
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  
  // open modal to add new user
  const handleAddNew = () => {
    setSelectedUser(null);
    setIsAdding(true);
    setIsModalOpen(true);
  };

  
  // handle form submit (add / edit)
  const handleSave = (data: Partial<User>) => {
    if (isAdding) {
      console.log("🆕 Adding new user:", data);
      setUsers((prev) => [...prev, { id: String(prev.length + 1), role: "customer", ...data } as User]);
    } else {
      console.log("✏️ Updating user:", data);
      if (selectedUser) {
        setUsers((prev) =>
          prev.map((u) => (u.id === selectedUser.id ? { ...u, ...data } : u))
        );
      }
    }
    setIsModalOpen(false);
  };


  // modal inputs fields
  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
    },
  ];

  // loading stage or not customers stage
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Loading users...</p>
      </div>
    );
  }

  return (
     <div className="p-6">
      {/* 🔍 Filter & Add */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        {/* Filter Input */}
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#a25a2a]"
        />

        {/* Add Button */}
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-[#a25a2a] hover:bg-[#5c3317] text-white px-4 py-2 rounded-lg transition"
        >
          <span className="text-lg font-bold">+</span> Add New
        </button>
      </div>

      {/* 📋 Table */}
      {filteredUsers.length > 0 ? (
        <Table<User> data={filteredUsers} columns={columns} />
      ) : (
        <p className="text-center text-gray-500 italic">
          No matching customers found.
        </p>
      )}

      {/* Reusable Modal */}
      <ReusableModal<User>
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        title={isAdding ? "Add New Customer" : `Edit ${selectedUser?.username}`}
        fields={fields}
        initialValues={selectedUser ?? {}}
      />
    </div>
  );
};

export default UsersTable;

