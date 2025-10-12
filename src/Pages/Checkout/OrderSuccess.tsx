import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/Common/Button";
import { LucideBadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-50 p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="bg-white p-10 rounded-2xl shadow-md text-center max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* ✅ أيقونة النجاح المتحركة */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10,
            delay: 0.2,
          }}
        >
          <LucideBadgeCheck className="text-orange-800 w-20 h-20" />
        </motion.div>

        <motion.h2
          className="text-3xl font-semibold mb-3 text-gray-800"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Thank You
          <LucideBadgeCheck className="inline-block text-orange-700 ml-2 w-6 h-6" />
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Your order was placed successfully. We'll contact you with shipping updates.
        </motion.p>

        <motion.div
          className="flex justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded"
            text="Back to Home"
          />
          <Button
            onClick={() => navigate("/orders")}
            className="px-6 py-2 rounded"
            text="View Orders"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default OrderSuccess;
