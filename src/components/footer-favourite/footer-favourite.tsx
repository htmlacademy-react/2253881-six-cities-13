import React from 'react';
import './footer-favourite.css';

const FooterFavourite: React.FC = () => (
  <footer className="footer container">
    <a className="footer__logo-link" href="main.html">
      <img
        className="footer__logo img-footer"
        src="img/logo.svg"
        alt="6 cities logo"
      />
    </a>
  </footer>
);

export default FooterFavourite;
