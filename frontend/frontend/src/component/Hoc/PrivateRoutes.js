import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const useAuth = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return true;
  } else {
    return false;
  }
};
const PrivateRoutes = (props) => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to={'/signin'} />;
};

export default PrivateRoutes;
