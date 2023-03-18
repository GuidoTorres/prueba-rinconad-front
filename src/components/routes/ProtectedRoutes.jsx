import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ role,children }) => {
  
  const location = useLocation();
  let user;

  return role ? (
    children
  ) : localStorage.getItem("user") ? (
    <Navigate to="/denegado" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
