import React from 'react';
import { Link } from 'react-router-dom';
import './not-found.css';

const NotFound: React.FC = () => (
  <div className="main-container">
    <h1 className="title-h1">404 Error</h1>
    <Link className="link-to-home" to="/">
      Back to homePage
    </Link>
  </div>
);

export default NotFound;
