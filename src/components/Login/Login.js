import React from 'react';

import Auth from "../Auth/Auth";

function Login() {
  return (
    <Auth 
      welcome="Рады видеть!"
      textButton='Войти'
      textLink='Регистрация'
      text='Ещё не зарегистрированы?'
      link='/signup'
      />
  );
}

export default Login;