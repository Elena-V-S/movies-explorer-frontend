import React from 'react';
import Promo from '../Promo/Promo';
import Footer from '../Footer/Footer';
import Portfolio from '../Portfolio/Portfolio';
import AboutMe from "../AboutMe/AboutMe";
import Techs from "../Techs/Techs";
import AboutProject from "../AboutProject/AboutProject";
import NavTab from "../NavTab/NavTab";
import Header from "../Header/Header";
import AuthMenu from "../AuthMenu/AuthMenu";

import './Main.css';


function Main() {
  return (
    <>
      <Header color={'#073042'} children={ <AuthMenu/> }/>
      <Promo/>
      <NavTab/> 
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
      <Footer/>
    </>
  );
}

export default Main;