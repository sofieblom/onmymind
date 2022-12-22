import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({
  authorized,
  children,
}: ProtectedRouteProps) => {
  if (!authorized) {
    console.log("DU HAR EJ TILLTRÄDE");
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};

interface ProtectedRouteProps {
  authorized: string | null;
  children?: any;
}
