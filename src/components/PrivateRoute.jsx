import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/auth/selectors';

const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const isAuth = useSelector(selectIsAuth);

    return !isAuth ? <Navigate to={redirectTo} /> : Component;
};

export default PrivateRoute;
