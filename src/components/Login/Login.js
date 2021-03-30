import React from 'react';
import useFormWithValidation from "../../hooks/FormValidation";

import Auth from "../Auth/Auth";
import { messageFailLogin } from "../../constants/massages";

function Login({ handleLogin, badRequest}) {
  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm
  } = useFormWithValidation({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(values.email, values.password);
    resetForm();
  };
  return (
    <Auth 
      userName={false}
      welcome="Рады видеть!"
      textButton='Войти'
      textLink='Регистрация'
      text='Ещё не зарегистрированы?'
      link='/signup'
      valueEmail={values.email}
      valuePassword={values.password}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      errors={errors}
      formIsValid={isValid}
      badRequest={badRequest}
      errorText={messageFailLogin}
      />
  );
}

export default Login;