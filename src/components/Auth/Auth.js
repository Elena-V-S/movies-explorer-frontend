import React from 'react';
import { Link } from 'react-router-dom';

import Logo from "../UI/Logo/Logo";
import './Auth.css';

function Auth({ errors, userName, welcome, link, textButton, textLink, type, handleSubmit, valuesUsername, valueEmail, valuePassword, handleChange, formIsValid, badRequest, errorText }) {
 
    return (
        <div className="auth">
           <Logo/>
           <h4 className="auth__welcome">{welcome}</h4>
           <form  className="auth__form" onSubmit={handleSubmit} noValidate>
              <ul className="auth__list">
                  {userName && 
                  <li><label htmlFor="name" className="auth_label">Имя
                      <input id="name" name="username" type="text" placeholder="Виталий" className="auth__input" 
                       value={valuesUsername || ''} 
                       onChange={handleChange} 
                       minLength={ 2 }
                    //    pattern="^[a-zA-Z\s\-]+$"
                       required/>
                       {errors.username && <span className="auth__error">{errors.username}</span>}
                       </label>
                  </li>}
                  <li>
                      <label htmlFor="email" className="auth_label">E-mail
                      <input id="email" name="email" type="email" className="auth__input" placeholder="pochta@yandex.ru" 
                      value={valueEmail || ''} 
                      onChange={handleChange} 
                      required
                    //   pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      />
                      {errors.email && <span className="auth__error">{errors.email}</span>}
                      <span className="auth__error">{errors.email}</span>
                      </label>
                  </li>
                  <li>
                      <label htmlFor="password" className="auth_label">Пароль
                      <input id="password" name="password" type="password" className="auth__input" 
                      value={valuePassword || ''} 
                      onChange={handleChange} 
                      minLength={ 8 }
                      required/>
                      {errors.password && <span className="auth__error">{errors.password}</span>}
                      </label>
                  </li>
                </ul>
                <div className="auth__button-block">
                    {badRequest && <p className="auth__error-request">{errorText}</p>}
                    <button  type="submit"  className={ formIsValid  ? "auth__button auth__button-active" : "auth__button auth__button-inactive"}  disabled={!formIsValid} >{textButton}</button>
                  </div>
           </form>
               <p className="auth_text">{type}
                   <Link to={link} className="auth__link">{textLink}</Link>
               </p>
          
        </div>
  );
}
export default Auth;
