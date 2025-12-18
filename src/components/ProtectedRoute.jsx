import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import "../Style/ProtectedRoute.css";

/**
 * ProtectedRoute Component
 * -------------------------
 * A secure wrapper for routes that require authentication or role-based access.
 *
 * @param {React.ReactNode} children - The protected component to render.
 * @param {Array<string>} allowedRoles - Optional list of roles that are authorized to access this route.
 */
export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth(); // loading helps handle async auth states
  const location = useLocation();

  // 🕒 While auth context is checking user state
  if (loading) {
    return (
      <div className="protected-route-loading">
        <div className="loading-text">
          Checking authentication...
        </div>
      </div>
    );
  }

  // 🚫 Not logged in → redirect to login page, preserving intended route
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🔒 Logged in but lacks permission → redirect to unauthorized or home
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Authorized → allow access
  return <>{children}</>;
}
