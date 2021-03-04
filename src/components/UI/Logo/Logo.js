import React from 'react';
import {Link} from 'react-router-dom';
import './Logo.css';
import logo from "../../../images/logo.svg";

function Logo() {
    return (
      <Link to='/' className="logo"><img alt="логотип" src={logo}></img></Link>
    );
  }
  
  export default Logo;