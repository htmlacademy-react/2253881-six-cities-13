import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <>
    <h1>404Error</h1>
    <Link to="/">Back to homePage</Link>
  </>
);

export default NotFound;
