// src/Pages/Auth/ResetPassword.tsx
import React, { useEffect, useState } from "react";
import InputField from "../../Components/Forms/InputField";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { User } from "../../Types/User";

const API_URL = "https://68e4f1f88e116898997db023.mockapi.io/data";

const ResetPassword: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState(""); // الحقل الجديد
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const emailParam = params.get("email");
    setEmail(emailParam);

    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>(API_URL);
        setUsers(res.data.filter((u) => u.resource === "user"));
      } catch {
        toast.error("⚠️ Failed to load users!");
      }
    };
    fetchUsers();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // التحقق من كل الحقول
    if (!email || !newPassword || !rePassword) {
      toast.error("⚠️ Please fill all fields!");
      return;
    }

    // التحقق من تطابق الباسوردين
    if (newPassword !== rePassword) {
      toast.error("⚠️ Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      const user = users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
      if (!user) {
        toast.error("🚫 Email not found!");
        return;
      }

      await axios.put(`${API_URL}/${user.id}`, { ...user, password: newPassword });

      toast.success("✅ Password reset successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      toast.error("❌ Failed to reset password!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#fdf5ef] flex flex-col justify-center px-6 md:px-16 py-10 min-h-screen md:min-h-0">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-2xl md:text-3xl font-bold mb-1 text-[#4a2b0b] text-center md:text-left">
        Reset Password
      </h2>
      <p className="text-gray-600 mb-6 text-sm text-center md:text-left">
        Enter your new password for <span className="font-semibold">{email}</span>.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full mx-auto">
        <InputField
          label="New Password *"
          type="password"
          name="newPassword"
          placeholder="new password"
          icon={<LockClosedIcon />}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <InputField
          label="Confirm New Password *"
          type="password"
          name="rePassword"
          placeholder="confirm new password"
          icon={<LockClosedIcon />}
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center items-center gap-2 border border-[#a25a2a] font-semibold py-2 rounded-none transition duration-300 ${
            isLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "text-[#a25a2a] hover:bg-[#a25a2a] hover:text-white"
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-[#a25a2a]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Updating...
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
