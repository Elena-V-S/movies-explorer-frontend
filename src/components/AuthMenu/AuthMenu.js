import React from 'react';
import { Link } from 'react-router-dom';
import "./AuthMenu.css";

function AuthMenu() {
    return (
        <nav className="menu">
            <ul className="menu__list">
              <li className="menu__elem">
                <Link to='/signup' className="menu__link" >Регистрация</Link>
              </li>
              <li className="menu__elem">
                <Link to='/signin'><button className="menu__button">Войти</button></Link>
              </li>
            </ul>
        </nav>
);
}

export default AuthMenu;
