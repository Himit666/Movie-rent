import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const ProtectedRoute = ({ role, children }) => {
  const { user } = useContext(AuthContext);

  // Check if user is logged in and has the correct role
  if (!user) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    // If user does not have the required role, redirect to login page
    return <Navigate to="/login" />;
  }

  // Render the children (protected content) if all checks pass
  return children;
};

export default ProtectedRoute;
