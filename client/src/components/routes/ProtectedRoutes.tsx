import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.ts";

interface ProtectedRouteProps {
  allowedRoles?: ("candidate" | "recruiter" | "admin")[];
}

// Helper to check JWT expiration
const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, token, logout } = useAuthStore();

  // If token is missing, expired, or state says unauthenticated
  if (!isAuthenticated || !token || isTokenExpired(token)) {
    logout(); // Clears Zustand state and localStorage ("auth-storage")
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
