import React from 'react';
import { Link } from 'react-router-dom';
import { Path } from '../../consts';
import './not-found.css';

const NotFound: React.FC = () => (
  <div className="main-container">
    <h1 className="title-h1">404 Error</h1>
    <Link className="link-to-home" to={Path.Main}>
      Back to homePage
    </Link>
  </div>
);

export default NotFound;
