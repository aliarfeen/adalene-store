import React from "react";
import { Outlet,  useNavigate  } from "react-router-dom";
import { LayoutDashboard, Users, Package, ShoppingBag, LogOut } from "lucide-react";
import Sidebar from "../Forms/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AdminLayout: React.FC = () => {
    const navigate = useNavigate();

  //static
  const admin = {
    username: "Admin",
    email: "admin@admin.com",
  };


   // ✅ logout logic
  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem("loggedAdmin");
    toast.success("✅ You’ve been logged out successfully!");
    setTimeout(() => navigate("/login"), 1200);
  };
  
const links = [
  { to: "dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
  { to: "userstable", label: "Users", icon: <Users /> },
  { to: "orderstable", label: "Orders", icon: <Package /> },
  { to: "productstable", label: "Products", icon: <ShoppingBag /> },
  { to: "/login", label: "Log out", icon: <LogOut />,  onClick: handleLogout},
];

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-[#f6efe6] to-[#fdf5ef]">

        {/* ✅ Toast container */}
      <ToastContainer position="top-right" autoClose={2000} />

      {/* ✅ Sidebar reusable component */}
      <Sidebar user={admin} links={links} />

      {/* ✅ Main content outlet */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
