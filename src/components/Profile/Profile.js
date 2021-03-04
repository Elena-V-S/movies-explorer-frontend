import React from 'react';
import { Link } from 'react-router-dom';

import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import PopupBurgerMenu from "../PopupBurgerMenu/PopupBurgerMenu";
import './Profile.css';

function Profile() {
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
        <h4 className="profile__welcome">Привет, Виталий!</h4>
        <form className="profile__form">
            <label htmlFor="name" className="profile_label profile__border">Имя </label>
            <input id="name" name="name" type="text"  placeholder="Виталий" className="profile__input profile__border" minLength='2' required/>
            <label htmlFor="email" className="profile_label">E-mail</label>
            <input id="email" name="email" type="email"  placeholder="pochta@yandex.ru" className="profile__input" required/>
            
            <button type="submit" className="profile__button" >Редактировать</button>
        </form>
        <Link to="/" className="profile__link" >Выйти из аккаунта</Link>
      </div>
      {isEditPopupOpen &&  <PopupBurgerMenu onClose={closePopup}/>} 
</>
  );
}

export default Profile;