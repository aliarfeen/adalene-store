import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Home, LogOut, User, Package } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { User as UserType } from "../../Types/User";

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

    // 👂 يسمع التغييرات على الـ localStorage أو الـ dispatch event
    const handleStorageChange = () => loadUser();
    const handleUserUpdated = () => loadUser();

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userUpdated", handleUserUpdated);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userUpdated", handleUserUpdated);
    };
  }, [navigate]);

  const getInitial = (name: string | undefined) =>
    name?.trim()?.charAt(0)?.toUpperCase() || "U";

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem("loggedUser");
    toast.success("✅ You’ve been logged out successfully!");
    setTimeout(() => navigate("/login"), 1200);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-[#f6efe6] to-[#fdf5ef]">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Sidebar */}
      <aside className="w-80 p-6 bg-gradient-to-b from-[#a25a2a] to-[#5c3317] text-white shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            {getInitial(user?.username)}
          </div>

          <div className="text-center">
            <div className="font-semibold text-lg">
              {user?.username || "User Name"}
            </div>
            <div className="text-xs opacity-80">
              {user?.email || "user.email@example.com"}
            </div>
          </div>
        </div>

        <nav className="mt-8 space-y-2">
          <NavLink
            to="account"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"
              }`
            }
          >
            <User className="round" />
            Account Details
          </NavLink>

          <NavLink
            to="myorder"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"
              }`
            }
          >
            <Package className="round" />
            My Orders
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"
              }`
            }
          >
            <Home className="round" />
            Back Home
          </NavLink>

          <NavLink
            to="/login"
            onClick={handleLogout}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"
              }`
            }
          >
            <LogOut className="round" />
            Log out
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default UserProfileLayout;
