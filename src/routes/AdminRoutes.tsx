import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAdmin = localStorage.getItem("isAdmin");

  if (!isAdmin) {
    return <Navigate to="/admin_login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
