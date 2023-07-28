import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { logoutAction } from '../../store/api-actions';
import { Path, AuthorizationStatus } from '../../consts';
import './header.css';

const Header: React.FC = () => {
  const isLogin = useLocation();
  const dispatch = useAppDispatch();
  const isNavToRender = isLogin.pathname === `/${Path.Login}`;
  const navigate = useNavigate();

  const isLogged = useAppSelector((state) => state.authorizationStatus);

  const onClickButtonLogout = () => {
    dispatch(logoutAction());
  };

  let navbar;

  if (isLogged === AuthorizationStatus.NoAuth) {
    navbar = (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <span className="header__nav-link header__nav-link--profile">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span
                onClick={() => navigate(`/${Path.Login}`)}
                className="header__login"
              >
                Sign in
              </span>
            </span>
          </li>
        </ul>
      </nav>
    );
  } else {
    navbar = (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <a className="header__nav-link header__nav-link--profile" href="#">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__user-name user__name">
                Oliver.conner@gmail.com
              </span>
              <span className="header__favorite-count">3</span>
            </a>
          </li>
          <li className="header__nav-item">
            <span className="header__nav-link">
              <span onClick={onClickButtonLogout} className="header__signout">
                Sign out
              </span>
            </span>
          </li>
        </ul>
      </nav>
    );
  }

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
          {!isNavToRender && navbar}
        </div>
      </div>
    </header>
  );
};

export default Header;
