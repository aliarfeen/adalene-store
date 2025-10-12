// src/Pages/Auth/Login.tsx
import React, { useEffect, useState } from "react";
import InputField from "../../Components/Forms/InputField";
import { LockClosedIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { User } from "../../Types/User";

const API_URL = "https://68e4f1f88e116898997db023.mockapi.io/data";

const Login: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // 🟢 Fetch users once
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(API_URL);
        const allUsers = response.data.filter((item) => item.resource === "user");
        setUsers(allUsers);
      } catch (error) {
        toast.error("❌ Failed to load users!");
      }
    };
    fetchUsers();
  }, []);

  // 🟠 Handle input change → لو المستخدم غيّر حاجة، فعّل الزر تاني
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsButtonDisabled(false);
  };

  // 🟣 Handle login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      toast.error("⚠️ Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setIsButtonDisabled(true);

    try {
      const existingUser = users.find(
        (user) => user.email?.toLowerCase() === email.toLowerCase()
      );

      if (!existingUser) {
        toast.error("🚫 Email not found. Please sign up first.");
        return;
      }

      if (existingUser.password !== password) {
        toast.error("❌ Incorrect password!");
        return;
      }

      // ✅ Store logged-in user in localStorage
      localStorage.setItem("loggedUser", JSON.stringify(existingUser));

      toast.success("🎉 Logged in successfully!");
    } catch (error) {
      toast.error("⚠️ Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#fdf5ef] flex flex-col justify-center px-6 md:px-16 py-10 min-h-screen md:min-h-0">
      <ToastContainer position="top-right" autoClose={2000} />

      <h2 className="text-2xl md:text-3xl font-bold mb-1 text-[#4a2b0b] text-center md:text-left">
        Log In
      </h2>
      <p className="text-gray-600 mb-6 text-sm text-center md:text-left">
        Welcome back! Please enter your details.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full mx-auto">
        <InputField
          label="Email *"
          type="email"
          name="email"
          placeholder="email"
          icon={<EnvelopeClosedIcon />}
          value={formData.email}
          onChange={handleChange}
          required
        />

        <InputField
          label="Password *"
          type="password"
          name="password"
          placeholder="password"
          icon={<LockClosedIcon />}
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-[#a25a2a] font-medium hover:underline transition"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading || isButtonDisabled}
          className={`w-full flex justify-center items-center gap-2 border border-[#a25a2a] font-semibold py-2 rounded-none transition duration-300 ${
            isLoading || isButtonDisabled
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
              Checking...
            </>
          ) : (
            "Log In"
          )}
        </button>

        <div className="text-center mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#a25a2a] font-medium hover:underline transition"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
