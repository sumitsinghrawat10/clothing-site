// src/Route/PublicRoute.jsx
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

export default function PublicRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  const persistedUser = localStorage.getItem("authUser");

  // ✅ If already logged in, redirect away from login page
  if (token || persistedUser) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
