import React from 'react';
import { Navigate } from 'react-router-dom';
import { AUTH_STATUS, PATHS_NAMES } from '../../consts';

interface IPrivateRouteProps {
  authStatus: string;
  children: JSX.Element;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = (props) => {
  const { authStatus, children } = props;

  return authStatus === AUTH_STATUS.Auth ? (
    children
  ) : (
    <Navigate to={`../${PATHS_NAMES.Login}`} />
  );
};

export default PrivateRoute;
