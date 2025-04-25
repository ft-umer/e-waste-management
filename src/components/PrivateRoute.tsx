// components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Not logged in: redirect to sign-in page
    return <Navigate to="/signin" replace />;
  }

  // Logged in: render the page
  return children;
};

export default PrivateRoute;
