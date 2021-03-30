import React from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import PopupBurgerMenu from "../PopupBurgerMenu/PopupBurgerMenu";
import "./Profile.css";
import useFormWithValidation from "../../hooks/FormValidation";
import {messageChangeProfile} from "../../constants/massages";

function Profile({ onSignOut, handleProfileUpdate, badRequest, setBadRequest }) {
  
  const currentUser = React.useContext(CurrentUserContext); // подписка на контекст
  
  React.useEffect(() => {
    setBadRequest(false);
  }, [setBadRequest])
  
  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  } = useFormWithValidation({
    email: currentUser.email,
    name: currentUser.name,
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleProfileUpdate(values.name, values.email); 
    resetForm();
  };
 
  const [isEditPopupOpen, setIsEditPopupOpen] = React.useState(false);

  function handleEditPopupClick() {
    setIsEditPopupOpen(true);
  }
  function closePopup() {
    setIsEditPopupOpen(false);
  }

  return (
    <>
      <Header
        children={<Navigation onEditPopup={handleEditPopupClick} />}
        color={"#FFFFFF"}
      />
      <div className="profile">
        <h4 className="profile__welcome">Привет, {currentUser.name}!</h4>
        <form className="profile__form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="name" className="profile_label profile__border">
            Имя{" "}
          </label>
          <div className="profile__input">
            <input
              id="name"
              name="name"
              type="text"
              value={values.name || ''}
              onChange={handleChange}
              className="profile__input profile__border"
              minLength="2"
              // pattern='^[a-zA-Z\s\-]+$' // не работает
              required
            />
            {errors.name && (
              <span className="profile__input-error">{errors.name}</span>
            )}
          </div>
          <label htmlFor="email" className="profile_label">
            E-mail
          </label>
          <div className="profile__input">
            <input
              id="email"
              name="email"
              type="email"
              value={values.email || ''}
              onChange={handleChange}
              className="profile__input"
              // pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" // не работает
              required
            />
            {errors.email && (
              <span className="profile__input-error">{errors.email}</span>
            )}
          </div>
          <div className="profile__button-block">
              {badRequest && <p className="profile__change-request">{messageChangeProfile}</p>}
              <button type="submit" onClick={handleSubmit} className={isValid ? "profile__button profile__button_active" : "profile__button profile__button_inactive"} disabled={!isValid}>
               Редактировать
              </button>
          </div>
        </form>
        <button onClick={onSignOut} className="profile__signout"> Выйти из аккаунта</button>
      </div>
      {isEditPopupOpen && <PopupBurgerMenu onClose={closePopup} />}
    </>
  );
}

export default Profile;
