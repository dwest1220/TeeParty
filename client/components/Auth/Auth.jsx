import { Navigate } from "react-router-dom";

export const isAuthenticated = () => {
  return !!localStorage.getItem("golf_user");
};

export const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};