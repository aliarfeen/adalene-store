import React from "react";
import { NavLink } from "react-router-dom";

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
  return (
    <aside className="w-80 p-6 bg-gradient-to-b from-[#a25a2a] to-[#5c3317] text-white shadow-lg">
      {/* User Info */}
      <div className="flex flex-col items-center gap-4">
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
            onClick={link.onClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
                isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"
              }`
            }
          >
            {link.icon && <span className="round">{link.icon}</span>}
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
