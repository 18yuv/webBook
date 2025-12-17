import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <p>Checking auth...</p>;

  return isLoggedIn ? children : <Navigate to="/login" />;
}