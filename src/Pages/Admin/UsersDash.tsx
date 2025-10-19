import React, { useEffect, useState } from "react";
import Table from "../../Components/Table/Table";
import ReusableModal from "../../Components/Forms/ReusableModal";
import type { User } from "../../Types/User";
import { z } from "zod";
import { toast } from "react-toastify";
import apiFactory from "../../Api/apiFactory";

const userSchema = z.object({
  username: z
    .string()
    .regex(
      /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/,
      "username must start with a letter and can contain letters, numbers, and underscores (4–16 chars)"
    ),
  email: z
    .string()
    .email("Invalid email format")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[cC][oO][mM]$/,
      "Email must end with .com"
    ),
  password: z
    .string()
    .regex(
      /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,}$/,
      "Password must be at least 8 characters and can include letters, numbers, and special characters"
    ),
});

type FormData = z.infer<typeof userSchema>;

const mapZodToRHF = (schema: z.ZodString) => {
  const validation: Record<string, any> = {};

  // Find the 'required' rule (implied by z.string().min(1, ...))
  const minRule = schema.safeParse("").success === false && (schema as any)._def.checks.find((check: any) => check.kind === 'min');
  if (minRule) {
      // Use the message from the min check for the 'required' error
      validation.required = minRule.message || "This field is required";
  } else {
      // Fallback if no min(1) is found, ensure required fields are marked
      validation.required = "This field is required";
  }

  // Find regex patterns
  const regexCheck = (schema as any)._def.checks.find((check: any) => check.kind === 'regex');
  if (regexCheck) {
    validation.pattern = {
      value: regexCheck.regex,
      message: regexCheck.message || "Invalid format",
    };
  }
  
  // Find email format
  if ((schema as any)._def.checks.some((check: any) => check.kind === 'email')) {
    // Note: RHF's 'pattern' or 'validate' can handle email, but since we are using regex in Zod anyway,
    // the regex check above often covers the format, but let's ensure the message is correct.
    const emailMessage = (schema as any)._def.checks.find((check: any) => check.kind === 'email')?.message;
    if (emailMessage) {
        // We'll rely on the regex above and ensure the RHF message is good.
    }
  }

  return validation;
};

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  //Ali--------------------------------------------------------------------
  
  // Define the RHF validation objects using the Zod helper
  const usernameValidation = mapZodToRHF(userSchema.shape.username as z.ZodString);
  const emailValidation = mapZodToRHF(userSchema.shape.email as z.ZodString);
  const passwordValidation = mapZodToRHF(userSchema.shape.password as z.ZodString);
  //Ali--------------------------------------------------------------------

  const handleDelete = async (selectedUser: User) => {
    try {
      await apiFactory.deleteUser(selectedUser);
      toast.success(`User ${selectedUser.username} deleted successfully!`);
    }catch(error){
      
      console.error("API error:", error);
      toast.error(`Operation failed: ${error}`);
    }

  }

  const handleSave = async (data: FormData) => {
    // 1. Perform final Zod validation check (backend safety)
    const result = userSchema.safeParse(data);

    if (!result.success) {
      // This should ideally not happen if RHF validation in the modal worked,
      // but it's a critical safety net.
      console.error("Zod Validation Failed:", result.error);
      toast.error(`Validation failed. Check your inputs.`);
      return;
    }

    const validatedData = result.data;

    try {
      if (isAdding) {
        // Logic for adding a new user
        console.log("🆕 Submitting new user to API:", validatedData);
        const userIds = users
        .filter((u) => u.resource === "user")
        .map((u) => Number(u.id))
        .filter((id) => !isNaN(id));

      const lastUserId = userIds.length > 0 ? Math.max(...userIds) : 100;

        const newUser: User = {
                id: (lastUserId + 1).toString(),
                username: data.username,
                email: data.email,
                password: data.password,
                resource: "user",
                role:"customer"
              };
       await apiFactory.sendUser(newUser);
        
        // Mock success for demonstration:
        // setUsers((prev) => [
        //   ...prev,
        //   { id: String(Date.now()), role: "customer", ...validatedData } as User,
        // ]);
        toast.success(`User ${validatedData.username} added successfully!`);

      } else if (selectedUser) {
        // Logic for updating an existing user
        const updatedUser = { ...validatedData, id: selectedUser.id, role: selectedUser.role , resource: "user"};
        console.log(updatedUser);
        
       await apiFactory.updateUser(updatedUser as User);
        
        toast.success(`User ${updatedUser.username} updated successfully!`);
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error(`Operation failed: ${error}`);
    } finally {
      setIsModalOpen(false);
    }
  };
  //Ali--------------------------------------------------------------------

  // fetch data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://68e4f1f88e116898997db023.mockapi.io/data"
        );
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
      header: "username",
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
            onClick={handleDelete.bind(null, user)}
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

  // modal inputs fields
  const fields = [
  {
    name: "username",
    label: "username",
    type: "text",
    validation: usernameValidation, 
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    validation: emailValidation, 
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    validation: passwordValidation, 
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
      <ReusableModal<FormData>
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        title={isAdding ? "Add New Customer" : `Edit ${selectedUser?.username}`}
        fields={fields}
        initialValues={
          isAdding
            ? { username: "", email: "", password: "" }
            : (selectedUser as unknown as FormData)
        }
      />
    </div>
  );
};

export default UsersTable;
