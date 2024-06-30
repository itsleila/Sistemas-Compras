import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ usuario, children }) => {
  if (!usuario) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
