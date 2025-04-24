import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import React from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || user.role !== "admin") {
    // Redirect non-admins to home page
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
