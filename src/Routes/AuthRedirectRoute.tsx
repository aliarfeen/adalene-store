
import { Navigate, Outlet } from "react-router-dom";
import type { User } from "../Types";

const AuthRedirectRoute = () => {
  const user: User | null = JSON.parse(localStorage.getItem("loggedUser") || "null");

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (user.role === "customer") {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />; 
};

export default AuthRedirectRoute;
