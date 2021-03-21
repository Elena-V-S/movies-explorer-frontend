import React from 'react';

import './SavedMovies.css';
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../UI/SearchForm/SearchForm";
import Footer from '../Footer/Footer';
import PopupBurgerMenu from "../PopupBurgerMenu/PopupBurgerMenu";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedMovies({savedMovies, isLoading}) {

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
    <div className="saved-movies">
        <Header children={ < Navigation onEditPopup={handleEditPopupClick}/> } color= {'#FFFFFF'} />
        <SearchForm/>
        <MoviesCardList  
          movies= {savedMovies} 
          isLoading={isLoading}
          isSaved = {true}/>
        <Footer/>
        {isEditPopupOpen &&  <PopupBurgerMenu onClose={closePopup}/>} 
    </div>
  );
}

export default SavedMovies;