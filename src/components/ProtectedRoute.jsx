import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

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
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-300 text-sm animate-pulse">
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
