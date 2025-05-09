import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles: string[]; // Must include at least one role: 'user', 'admin', or 'rider'
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles = ["user", "admin"] }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userType'); // Use consistent key name everywhere
  const location = useLocation();

  if (!token || !role) {
    // Not authenticated
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Authenticated but not authorized
    return <Navigate to="/rider/login" replace />;
  }
  

  return children;
};

export default PrivateRoute;
