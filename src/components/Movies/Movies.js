import React from 'react';

import './Movies.css';
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../UI/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from '../Footer/Footer';
import PopupBurgerMenu from "../PopupBurgerMenu/PopupBurgerMenu";
import AddFilmButton from "../UI/AddFilmButton/AddFilmButton";


function Movies() {
  //переменная состояния и обработчики событий добавлены для возможности открыть бургер-меню
  const [isEditPopupOpen, setIsEditPopupOpen] = React.useState(false);

  function handleEditPopupClick() { 
    setIsEditPopupOpen(true); 
} 
function closePopup(){ 
  setIsEditPopupOpen(false); 
}
  
  return (
    <div className="movies"> 
        <Header children={ < Navigation onEditPopup={handleEditPopupClick}/> } color= {'#FFFFFF'} />
        <SearchForm/>
        <MoviesCardList/>
        <AddFilmButton/>
        <Footer/>
        {isEditPopupOpen &&  <PopupBurgerMenu onClose={closePopup}/>} 
    </div>
  );
}

export default Movies;
