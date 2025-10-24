import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Home, LogOut, User, Package, Heart  } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { User as UserType } from "../../Types/User";
import Sidebar from "../Forms/Sidebar"; 

const UserProfileLayout: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem("loggedUser");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        navigate("/login");
      }
    };

    loadUser();

    const handleStorageChange = () => loadUser();
    const handleUserUpdated = () => loadUser();

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userUpdated", handleUserUpdated);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userUpdated", handleUserUpdated);
    };
  }, [navigate]);

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem("loggedUser");
    toast.success("✅ You’ve been logged out successfully!");
    setTimeout(() => navigate("/login"), 1200);
  };

  const links = [
    { to: "account", label: "Account Details", icon: <User /> },
    { to: "myorder", label: "My Orders", icon: <Package /> },
    { to: "wishlist", label: "My Wishlist", icon: <Heart /> },
    { to: "/", label: "Back Home", icon: <Home /> },
    { to: "/login", label: "Log out", icon: <LogOut />, onClick: handleLogout },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-[#f6efe6] to-[#fdf5ef]">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* reusable sidebar*/}
      <Sidebar user={user ?? undefined} links={links} />

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default UserProfileLayout;
