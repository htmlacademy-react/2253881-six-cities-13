import React, { useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getAuthStatus } from '../../store/user-slice/selectors-user';
import { AuthorizationStatus, Path, City, SortMethod } from '../../consts';
import {
  setCity,
  setFiltredOffers,
  setSortMethod,
} from '../../store/offers-slice/offers-slice';
import { redirectToRoute } from '../../store/actions';
import styles from './login-screen.module.css';

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector(getAuthStatus);

  const arrayOfCitys = Object.values(City);

  const randomCity =
    arrayOfCitys[Math.floor(Math.random() * arrayOfCitys.length)];

  const onClickButtonCity = useCallback(() => {
    dispatch(setCity(randomCity));
    dispatch(setFiltredOffers(randomCity));
    dispatch(setSortMethod(SortMethod.Popular));
    dispatch(redirectToRoute(Path.Main));
  }, [dispatch, randomCity]);

  if (isLogged === AuthorizationStatus.Auth) {
    return <Navigate to={Path.Main} />;
  }

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <button
                onClick={onClickButtonCity}
                className={`${styles.buttonCity} locations__item-link`}
              >
                <span>{randomCity}</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginScreen;
