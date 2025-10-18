import { Navigate, Outlet } from "react-router-dom";
import type { User } from "../Types";

interface ProtectedRouteProps {
  allowedRole: "customer" | "admin";
}

const ProtectedRoute = ({ allowedRole }: ProtectedRouteProps) => {
  const user: User | null = JSON.parse(localStorage.getItem("loggedUser") || "null");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
   return (
  <Navigate
    to={user.role === "admin" ? "/admin/dashboard" : "/"}
    replace
  />
);
  }

  return <Outlet />;
};

export default ProtectedRoute;
