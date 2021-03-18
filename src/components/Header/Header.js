import React from 'react';
import './Header.css';
import Logo from "../UI/Logo/Logo";

function Header({ children , color }) {
  return (
    <header className="header" style={{ background: color }}>
        <Logo/>
        {children}
    </header>
  );
}

export default Header;
