import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const authenticated = localStorage.getItem("token" || "");

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};

interface ProtectedRouteProps {
  children?: any;
}
