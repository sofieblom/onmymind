import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({
  authenticated,
  children,
}: ProtectedRouteProps) => {
  if (!authenticated) {
    console.log("AUTH", authenticated);
    console.log("DU HAR EJ TILLTRÄDE");
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};

interface ProtectedRouteProps {
  authenticated: string | null;
  children?: any;
}
