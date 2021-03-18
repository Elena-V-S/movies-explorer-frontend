import React from 'react';

import './SavedMovies.css';
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../UI/SearchForm/SearchForm";
import Footer from '../Footer/Footer';
import PopupBurgerMenu from "../PopupBurgerMenu/PopupBurgerMenu";
import AddFilmButton from "../UI/AddFilmButton/AddFilmButton";
import MoviesCardList from "../MoviesCardList/MoviesCardList";



function SavedMovies({movies, isLoading}) {
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
          movies= {movies} 
          isLoading={isLoading}/>
        <Footer/>
        {isEditPopupOpen &&  <PopupBurgerMenu onClose={closePopup}/>} 
    </div>
  );
}

export default SavedMovies;