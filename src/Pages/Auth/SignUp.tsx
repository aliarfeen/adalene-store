import React, { useEffect, useState } from "react";
import InputField from "../../Components/Forms/InputField";
import { PersonIcon, LockClosedIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import axios from "axios";
import type { User } from "../../Types/User";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// ✅ Validation Schema
const schema = z
  .object({
    userName: z
      .string()
      .regex(
        /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/,
        "Username must start with a letter and can contain letters, numbers, and underscores (6–16 chars)"
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirmation must match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const API_URL = "https://68e4f1f88e116898997db023.mockapi.io/data";

const SignUp: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // ✅ Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(API_URL);
        const allUsers = response.data.filter((item) => item.resource === "user");
        setUsers(allUsers);
        console.log("📋 Current Users:", allUsers);
      } catch (error) {
        toast.error("Failed to fetch users 😢");
      }
    };
    fetchUsers();
  }, []);

  // ✅ Submit form
const onSubmit = async (data: FormData) => {
  try {
    setIsSubmitting(true);

    // ✅ Check if email + password already exist (user already registered)
    const existingUserWithSameCredentials = users.find(
      (user) =>
        user.email?.toLowerCase() === data.email.toLowerCase() &&
        user.password === data.password
    );

    if (existingUserWithSameCredentials) {
      toast.error("🟢 You already have an account. Please log in instead.");
      return;
    }

    // ✅ Check if only the email exists (but with a different password)
    const existingEmail = users.find(
      (user) => user.email?.toLowerCase() === data.email.toLowerCase()
    );

    if (existingEmail) {
      toast.error("❌ This email is already registered with another password!");
      return;
    }

    // ✅ Check if username exists
    const existingUsername = users.find(
      (user) => user.username?.toLowerCase() === data.userName.toLowerCase()
    );

    if (existingUsername) {
      toast.error("❌ Username already exists. Please choose another one.");
      return;
    }

    // // ✅ If everything is fine → create new user
    // const lastUserId =
    //   users.length > 0 ? Math.max(...users.map((u) => Number(u.id))) : 0;

    // ✅ Calculate the last user ID only from users (resource === "user")
const userIds = users
  .filter((u) => u.resource === "user")
  .map((u) => Number(u.id))
  .filter((id) => !isNaN(id));

const lastUserId = userIds.length > 0 ? Math.max(...userIds) : 100; // start from 101 if empty

    const newUser: User = {
      id: (lastUserId + 1).toString(),
      username: data.userName,
      email: data.email,
      password: data.password,
      resource: "user",
    };

    await axios.post(API_URL, newUser);
    setUsers((prev) => [...prev, newUser]);
    reset();

    toast.success("🎉 Account created successfully!");
  } catch (error) {
    toast.error("❌ Error creating account. Try again later.");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
<div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-[#5c3317] to-[#e0c2a2]">
  <ToastContainer position="top-right" autoClose={2000} />

  {/* Left Section */}
  <div
    className="hidden md:flex w-full md:w-1/2 text-white flex-col justify-center px-6 md:px-16 py-10 md:py-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage:
        "url('https://static.wixstatic.com/media/ea71bb_049132934a484c96b5c05403933e4539~mv2_d_6720_4480_s_4_2.jpg/v1/fill/w_473,h_479,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/ea71bb_049132934a484c96b5c05403933e4539~mv2_d_6720_4480_s_4_2.jpg')",
    }}
  >
    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#4a2b0b]">
      Welcome to Our Community
    </h1>
    <p className="text-base md:text-lg text-gray-900">
      Join thousands of users who trust us with their journey. Create your account and unlock amazing features.
    </p>
  </div>

  {/* Right Section */}
  <div className="w-full md:w-1/2 bg-[#fdf5ef] flex flex-col justify-center px-6 md:px-16 py-10">
    <h2 className="text-2xl md:text-3xl font-bold mb-1 text-[#4a2b0b] text-center md:text-left">
      Sign Up
    </h2>
    <p className="text-gray-600 mb-6 text-sm text-center md:text-left">
      Create your account to get started
    </p>

    {/* ✅ FORM */}
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md w-full mx-auto"
    >
      <InputField
        label="Username *"
        type="text"
        placeholder="username"
        icon={<PersonIcon />}
        {...register("userName")}
        required
      />
      {errors.userName && (
        <p className="text-red-500 text-sm">{errors.userName.message}</p>
      )}

      <InputField
        label="Email *"
        type="email"
        placeholder="email"
        icon={<EnvelopeClosedIcon />}
        {...register("email")}
        required
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <InputField
        label="Password *"
        type="password"
        placeholder="password"
        icon={<LockClosedIcon />}
        {...register("password")}
        required
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <InputField
        label="Confirm Password *"
        type="password"
        placeholder="re-password"
        icon={<LockClosedIcon />}
        {...register("confirmPassword")}
        required
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
      )}

      {/* Checkbox */}
      <div className="flex items-center mt-2 mb-6">
        <input type="checkbox" id="terms" className="mr-2" required />
        <label htmlFor="terms" className="text-sm text-gray-700">
          I agree to the{" "}
          <span className="text-orange-600 font-semibold">Terms of Service</span> and{" "}
          <span className="text-orange-600 font-semibold">Privacy Policy</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full flex justify-center items-center gap-2 border border-[#a25a2a] font-semibold py-2 rounded-none transition duration-300 ${
          isSubmitting
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "text-[#a25a2a] hover:bg-[#a25a2a] hover:text-white"
        }`}
      >
        {isSubmitting ? (
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
            Registering...
          </>
        ) : (
          "Register"
        )}
      </button>

      <div className="text-center mt-6 text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-[#a25a2a] font-medium hover:underline transition">
          Log in
        </a>
      </div>
    </form>
  </div>
</div>



  );
};

export default SignUp;


