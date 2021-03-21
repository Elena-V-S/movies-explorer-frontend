import React from 'react';
import useFormWithValidation from "../FormValidation/FormValidation";

import Auth from "../Auth/Auth";

function Login({ handleLogin }) {
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
      />
  );
}

export default Login;