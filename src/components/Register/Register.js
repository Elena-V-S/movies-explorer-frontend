import React from 'react';

import Auth from "../Auth/Auth";
import useFormWithValidation from "../../hooks/FormValidation";
import {messageFailRegister} from "../../utils/massages";


function Register({ handleRegister, badRequest}) {
  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm
  } = useFormWithValidation({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister(values.username, values.email, values.password);
    resetForm();
  };

    return (
      <Auth 
      userName={true}
      welcome="Добро пожаловать!"
      textButton='Зарегистрироваться'
      textLink='Войти'
      text='Уже зарегистрированы?'
      link='/signin'
      valuesUsername={values.username}
      valueEmail={values.email}
      valuePassword={values.password}
      onChangePassword={handleChange}
      onChangeEmail= {handleChange}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      errors={errors}
      formIsValid={isValid}
      badRequest={badRequest}
      errorText={messageFailRegister}
      />
  );
}

export default Register;


