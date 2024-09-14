// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token'); // Check for JWT token in local storage

  if (!token) {
    return <Navigate to="/" />; // Redirect to login page if not authenticated
  }

  return children; // Render the component if authenticated
}

export default ProtectedRoute;
