import React, { useState } from 'react';
import Header from '../../components/header/header';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { loginAction } from '../../store/api-actions';
import { AuthorizationStatus, Path } from '../../consts';

interface IValuesInputs {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const [inputValues, setInputsValues] = useState<IValuesInputs>({
    email: '',
    password: '',
  });

  const isLogged = useAppSelector((state) => state.authorizationStatus);

  if (isLogged === AuthorizationStatus.Auth) {
    return <Navigate to={Path.Main} />;
  }

  const onChangeInputHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.name === 'email') {
      setInputsValues({ ...inputValues, email: evt.target.value });
    } else {
      setInputsValues({ ...inputValues, password: evt.target.value });
    }
  };

  const onClickButtonSubmitFormHandler = (
    evt: React.FormEvent<HTMLFormElement>
  ) => {
    evt.preventDefault();

    // eslint-disable-next-line
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (!reg.test(inputValues.email) || inputValues.password.length === 0) {
      return;
    }

    if (inputValues.password.includes(' ')) {
      toast.warn('Удалите пробелы из пароля');
      return;
    }

    dispatch(loginAction(inputValues));
  };

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              onSubmit={onClickButtonSubmitFormHandler}
              className="login__form form"
              action="#"
              method="post"
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={inputValues.email}
                  required
                  onChange={onChangeInputHandler}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={inputValues.password}
                  required
                  onChange={onChangeInputHandler}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
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
