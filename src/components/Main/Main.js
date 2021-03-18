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
import Navigation from "../Navigation/Navigation";
import PopupBurgerMenu from "../PopupBurgerMenu/PopupBurgerMenu";


import './Main.css';

function Main({loggedIn}) {

  const [isEditPopupOpen, setIsEditPopupOpen] = React.useState(false);
  
  function handleEditPopupClick() { 
    setIsEditPopupOpen(true); 
  } 
  function closePopup(){ 
    setIsEditPopupOpen(false); 
  }
  return (
    <>
      {!loggedIn ? 
         <Header color={'#073042'} children={ <AuthMenu/> }/>
         :  <Header   children={ < Navigation onEditPopup={handleEditPopupClick}/> }/>
        } 
      <Promo/>
      <NavTab/> 
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
      <Footer/>
      {isEditPopupOpen &&  <PopupBurgerMenu onClose={closePopup}/>} 
    </>
  );
}

export default Main;
