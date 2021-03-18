import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import "./PopupBurgerMenu.css";
import Account from "../UI/Accaunt/Account";

function PopupBurgerMenu({onClose}) {
  return (
    <>
          <div className="popup"></div>
          <div className="popup__contaner">
              <button className="popup__close" onClick={onClose}></button>
              <ul className="popup__list">
                  <li className="popup__elem">
                    <NavLink  exact to='/' className="popup__link" activeClassName="popup__link_active">Главная</NavLink> 
                  </li>
                  <li className="popup__elem">
                    <NavLink to='/movies' className="popup__link" activeClassName="popup__link_active">Фильмы</NavLink> 
                  </li>
                  <li className="popup__elem">
                     <NavLink to='/saved-movies' className="popup__link" activeClassName="popup__link_active">Сохраненные фильмы</NavLink>
                  </li>
              </ul>
              <Link to='/profile' className="popup__link"><Account/></Link>
          </div>
      </>
  );
}

export default PopupBurgerMenu;