import React, { useState } from "react";
import InputField from "../../Components/Forms/InputField2";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "emailjs-com";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SERVICE_ID = "service_16sfnoq"; // Service ID
const TEMPLATE_ID = "template_dt6slte"; // Template ID
const PUBLIC_KEY = "gdQC34yoBHtXwNZjK"; // Public key من EmailJS
const USERS_API = "https://68e4f1f88e116898997db023.mockapi.io/data"; // نفس API بتاعك

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("⚠️ Please enter your email!");
      return;
    }

    setIsSending(true);

    try {
      // ✅ جلب كل البيانات من الـ API
      const res = await axios.get(USERS_API);
      const data = res.data;

      // ✅ فلترة المستخدمين فقط (resource === "user")
      const users = data.filter((item: any) => item.resource === "user");

      // ✅ التحقق من وجود الإيميل
      const userExists = users.some(
        (u: any) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!userExists) {
        toast.error("❌ Email not found! Redirecting to Sign Up...");
        setTimeout(() => navigate("/signup"), 3000);
        setIsSending(false);
        return;
      }

      const resetLink = `${window.location.origin}/resetpassword`;

      // ✉️ إرسال الإيميل عبر EmailJS
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          user_email: email,
          reset_link: resetLink,
        },
        PUBLIC_KEY
      );

      toast.success("📧 Reset link sent! Check your email.");
      setEmail("");

      // ✅ حفظ حالة طلب إعادة التعيين مع صلاحية 5 دقائق
      const expiration = new Date().getTime() + 5 * 60 * 1000;
      localStorage.setItem(
        "resetRequested",
        JSON.stringify({ email, expires: expiration })
      );
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to send email. Try again!");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-[#fdf5ef] flex flex-col justify-center px-6 md:px-16 py-10 min-h-screen md:min-h-0">
      <ToastContainer position="top-right" autoClose={2000} />

      <h2 className="text-2xl md:text-3xl font-bold mb-1 text-[#4a2b0b] text-center md:text-left">
        Forgot Password
      </h2>
      <p className="text-gray-600 mb-6 text-sm text-center md:text-left">
        Enter your registered email to receive a reset link.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md w-full mx-auto"
      >
        <InputField
          label="Email *"
          type="email"
          name="email"
          placeholder="email"
          icon={<EnvelopeClosedIcon />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={isSending}
          className={`w-full flex justify-center items-center gap-2 border border-[#a25a2a] font-semibold py-2 rounded-none transition duration-300 ${
            isSending
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "text-[#a25a2a] hover:bg-[#a25a2a] hover:text-white"
          }`}
        >
          {isSending ? (
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
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>

        <div className="text-center mt-6 text-sm text-gray-600">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-[#a25a2a] font-medium hover:underline transition"
          >
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
