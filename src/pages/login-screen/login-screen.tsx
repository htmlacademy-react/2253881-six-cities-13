import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';
import { useAppSelector } from '../../hooks/redux-hooks';
import { getAuthStatus } from '../../store/user-slice/selectors-user';
import { AuthorizationStatus, Path } from '../../consts';

const LoginScreen: React.FC = () => {
  const isLogged = useAppSelector(getAuthStatus);

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
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginScreen;
