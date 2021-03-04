import React from 'react';
import { Link } from 'react-router-dom';

import Logo from "../UI/Logo/Logo";
import './Auth.css';

function Auth({children, welcome, link, textButton, textLink, text}) {

    return (
        <div className="auth">
           <Logo/>
           <h4 className="auth__welcome">{welcome}</h4>
           <form  className="auth__form">
              <ul className="auth__list">
                  <li>{children}</li> 
                  <li>
                      <label htmlFor="email" className="auth_label">E-mail
                      <input id="email" name="email" type="email" className="auth__input" placeholder="pochta@yandex.ru" required/>
                      </label>
                  </li>
                  <li>
                      <label htmlFor="password" className="auth_label">Пароль
                      <input id="password" name="password" type="password" className="auth__input" minLength='4' required/>
                      </label>
                  </li>
                </ul>
                <button  type="submit" className="auth__button" >{textButton}</button>
           </form>
               <p className="auth_text">{text}
                   <Link to={link} className="auth__link">{textLink}</Link>
               </p>
          
        </div>
  );
}
export default Auth;