import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { logoutAction } from '../../store/user-slice/async-user-slice';
import { Path, AuthorizationStatus } from '../../consts';
import { getAuthStatus } from '../../store/user-slice/selectors-user';
import './header.css';
import { getAllOffers } from '../../store/offers-slice/selectors-offers';

const Header: React.FC = () => {
  const isLogin = useLocation();
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector(getAuthStatus);
  const offers = useAppSelector(getAllOffers);

  const isNavToRender = isLogin.pathname === `/${Path.Login}`;

  const onClickButtonLogout = () => {
    dispatch(logoutAction());
  };

  const favCount = offers.reduce(
    (acc, el) => (el.isFavorite ? (acc = acc + 1) : acc),
    0
  );

  let contentForNavbar;

  if (isLogged === AuthorizationStatus.NoAuth) {
    contentForNavbar = (
      <li className="header__nav-item user">
        <span className="header__nav-link header__nav-link--profile">
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <Link className="header__login" to={`/${Path.Login}`}>
            Sign in
          </Link>
        </span>
      </li>
    );
  } else {
    contentForNavbar = (
      <>
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to={`/${Path.Favorite}`}
          >
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">
              Oliver.conner@gmail.com
            </span>
            <span className="header__favorite-count">{favCount}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <span className="header__nav-link">
            <span onClick={onClickButtonLogout} className="header__signout">
              Sign out
            </span>
          </span>
        </li>
      </>
    );
  }

  const navbar = (
    <nav className="header__nav">
      <ul className="header__nav-list">{contentForNavbar}</ul>
    </nav>
  );

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
