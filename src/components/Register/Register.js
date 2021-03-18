import React from 'react';

import Auth from "../Auth/Auth";

function Register() {
    return (
      <Auth 
      children={
      <label htmlFor="name" className="auth_label">Имя
          <input id="name" name="name" type="text" placeholder="Виталий" className="auth__input" minLength="2" required/>
      </label>}
      welcome="Добро пожаловать!"
      textButton='Зарегистрироваться'
      textLink='Войти'
      text='Уже зарегистрированы?'
      link='/signin'
      />
  );
}

export default Register;