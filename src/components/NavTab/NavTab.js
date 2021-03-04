import React from 'react';

import './NavTab.css';


function NavTab() {
  return (
    <nav className="nav">
        <ul className="nav__bar">
            <li className="nav__elem"><a href="#about-project" className="nav__link">О проекте</a></li>
            <li className="nav__elem"><a href="#techs" className="nav__link">Технологии</a></li>
            <li className="nav__elem"><a href="#about-me" className="nav__link">Студент</a></li>
        </ul>
    </nav>
  );
}

export default NavTab;