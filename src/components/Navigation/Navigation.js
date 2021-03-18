import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import Account from "../UI/Accaunt/Account";


function Navigation({onEditPopup}) {
  return (
    <>
    <ul className="navigation">
        <li>
          <NavLink to='/movies' activeClassName="navigation__link_active" className="navigation__link navigation__link-style">Фильмы</NavLink>
        </li>
        <li>
          <NavLink to='/saved-movies' activeClassName="navigation__link_active" className="navigation__link navigation__link-style">Сохранённые фильмы</NavLink>
          </li>
        <li><NavLink to='/profile' className="navigation__link-style"><Account/></NavLink></li>
    </ul>
    
    <button className="navigation__burger-container" onClick={onEditPopup} >
        <div className="navigation__burger-line"/>
        <div className="navigation__burger-line"/>
        <div className="navigation__burger-line"/>
    </button>
    </>
  );
}

export default Navigation;