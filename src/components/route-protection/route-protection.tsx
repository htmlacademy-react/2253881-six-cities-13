import React from 'react';
import { Navigate } from 'react-router-dom';
import { AUTH_STATUS, PATHS_NAMES } from '../../consts';

interface IRouteProtectionProps {
  authStatus: string;
  children: JSX.Element;
}

const RouteProtection: React.FC<IRouteProtectionProps> = (props) => {
  const { authStatus, children } = props;

  return authStatus === AUTH_STATUS.Auth ? (
    children
  ) : (
    <Navigate to={`../${PATHS_NAMES.Login}`} />
  );
};

export default RouteProtection;
