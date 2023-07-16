import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthStatus, Path } from '../../consts';

interface IPrivateRouteProps {
  authStatus: string;
  children: JSX.Element;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = (props) => {
  const { authStatus, children } = props;

  return authStatus === AuthStatus.Auth ? (
    children
  ) : (
    <Navigate to={`/${Path.Login}`} />
  );
};

export default PrivateRoute;
