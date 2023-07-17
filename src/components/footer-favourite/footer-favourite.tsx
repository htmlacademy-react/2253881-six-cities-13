import React from 'react';
import { Link } from 'react-router-dom';
import { Path } from '../../consts';
import './footer-favourite.css';

const FooterFavourite: React.FC = () => (
  <footer className="footer container">
    <Link className="footer__logo-link" to={Path.Main}>
      <img
        className="footer__logo img-footer"
        src="img/logo.svg"
        alt="6 cities logo"
      />
    </Link>
  </footer>
);

export default FooterFavourite;
