import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { toast } from 'react-toastify';
import * as EmailValidator from 'email-validator';
import { loginAction } from '../../store/user-slice/async-user-slice';

interface IValuesInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [inputValues, setInputsValues] = useState<IValuesInputs>({
    email: '',
    password: '',
  });

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

    if (
      !EmailValidator.validate(inputValues.email) ||
      inputValues.password.length === 0
    ) {
      return;
    }

    if (inputValues.password.includes(' ')) {
      toast.warn('Удалите пробелы из пароля');
      return;
    }

    dispatch(loginAction(inputValues));
  };

  return (
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
      <button className="login__submit form__submit button" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
