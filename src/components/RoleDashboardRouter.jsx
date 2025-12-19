import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

/**
 * RoleDashboardRouter Component
 * -------------------------
 * Automatically redirects users to their role-specific dashboard.
 * Prevents the same dashboard from showing for all users.
 */
export default function RoleDashboardRouter() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600 dark:text-gray-300 text-sm animate-pulse">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based dashboard routing
  const rolePathMap = {
    Learner: '/dashboard/learner',
    Institution: '/dashboard/institution',
    Employer: '/dashboard/employer',
    Admin: '/dashboard/admin',
  };

  const dashboardPath = rolePathMap[user.role] || '/dashboard/learner';

  return <Navigate to={dashboardPath} replace />;
}
