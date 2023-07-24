import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, Path } from '../../consts';

interface IPrivateRouteProps {
  authStatus: string;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = (props) => {
  const { authStatus, children } = props;

  return authStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={`/${Path.Login}`} />
  );
};

export default PrivateRoute;
