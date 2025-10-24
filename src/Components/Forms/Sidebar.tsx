import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface SidebarLink {
  to: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

interface SidebarProps {
  user?: {
    username?: string;
    email?: string;
  };
  links: SidebarLink[];
}

const getInitial = (name?: string) => (name ? name.charAt(0).toUpperCase() : "U");

const Sidebar: React.FC<SidebarProps> = ({ user, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Toggle Button (visible on small screens) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#5c3317] text-white p-2 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-[#a25a2a] to-[#5c3317] text-white shadow-lg transition-all duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        fixed lg:static lg:translate-x-0 h-full lg:h-auto w-64 lg:w-80 p-6 z-40`}
      >
        {/* User Info */}
        <div className="flex flex-col items-center gap-4 mt-10 lg:mt-0">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            {getInitial(user?.username)}
          </div>

          <div className="text-center">
            <div className="font-semibold text-lg">{user?.username || "User Name"}</div>
            <div className="text-xs opacity-80">{user?.email || "user.email@example.com"}</div>
          </div>
        </div>

        {/* Links */}
        <nav className="mt-8 space-y-2">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              onClick={(e) => {
                link.onClick?.(e);
                if (window.innerWidth < 1024) setIsOpen(false); // auto close on mobile
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                  isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"
                }`
              }
            >
              {link.icon && <span className="text-lg">{link.icon}</span>}
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay (only visible when sidebar is open on small screens) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
