import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Path } from '../../consts';
import './header.css';

const Header: React.FC = () => {
  const isLogin = useLocation();
  const isNavToRender = isLogin.pathname === `/${Path.Login}`;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link
              to={Path.Main}
              className="header__logo-link header__logo-link--active"
            >
              <img
                className="header__logo img-size"
                src="img/logo.svg"
                alt="6 cities logo"
              />
            </Link>
          </div>
          {!isNavToRender && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
