import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const UserProfileLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-[#f6efe6] to-[#fdf5ef]">
      {/* Sidebar */}
      <aside className="w-80 p-6 bg-gradient-to-b from-[#a25a2a] to-[#5c3317] text-white shadow-lg">
        <div className="flex flex-col items-center gap-4">
          {/* avatar placeholder handled in AccountDetails but show small avatar here */}
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            U
          </div>
          <div className="text-center">
            <div className="font-semibold text-lg">User Name</div>
            <div className="text-xs opacity-80">user.email@example.com</div>
          </div>
        </div>

        <nav className="mt-8 space-y-2">
          <NavLink
            to="account"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                isActive
                  ? "bg-white/20 font-semibold"
                  : "hover:bg-white/10"
              }`
            }
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zM6 20a6 6 0 0112 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Account Details
          </NavLink>

          <NavLink
            to="orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                isActive
                  ? "bg-white/20 font-semibold"
                  : "hover:bg-white/10"
              }`
            }
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M3 3h18v4H3zM5 11h14v10H5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            My Orders
          </NavLink>
        </nav>
      </aside>

      {/* Right content (outlet) */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default UserProfileLayout;
