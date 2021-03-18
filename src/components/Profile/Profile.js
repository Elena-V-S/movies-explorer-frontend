import React from 'react';
import { Link } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import PopupBurgerMenu from "../PopupBurgerMenu/PopupBurgerMenu";
import './Profile.css';

function Profile({onSignOut}) {

  const currentUser = React.useContext(CurrentUserContext); // подписка на контекст

   //переменная состояния и обработчики событий добавлены для возможности открыть бургер-меню
   const [isEditPopupOpen, setIsEditPopupOpen] = React.useState(false);
 
  function handleEditPopupClick() { 
     setIsEditPopupOpen(true); 
  } 
  function closePopup(){ 
   setIsEditPopupOpen(false); 
  }
 

  return (
    <>
      <Header children={ < Navigation onEditPopup={handleEditPopupClick}/> } color= {'#FFFFFF'} />
      <div className="profile">
        <h4 className="profile__welcome">Привет, {currentUser.name}!</h4>
        <form className="profile__form">
            <label htmlFor="name" className="profile_label profile__border">Имя </label>
            <input id="name" name="name" type="text"  placeholder={currentUser.name} className="profile__input profile__border" minLength='2' required/>
            <label htmlFor="email" className="profile_label">E-mail</label>
            <input id="email" name="email" type="email"  placeholder={currentUser.email} className="profile__input" required/>
            <button type="submit" className="profile__button">Редактировать</button>
        </form>
       <button onClick={onSignOut} className="profile__signout">Выйти из аккаунта</button>
      </div>
      {isEditPopupOpen &&  <PopupBurgerMenu onClose={closePopup}/>} 
</>
  );
}

export default Profile;

