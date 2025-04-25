import { Navigate, Outlet } from "react-router-dom";

const ProtectedUserRoute = () => {
  const isAuth = localStorage.getItem("isAuthenticated");

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedUserRoute;
