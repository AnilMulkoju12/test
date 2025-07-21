import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Helper to check authentication
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // check if JWT token exists
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
