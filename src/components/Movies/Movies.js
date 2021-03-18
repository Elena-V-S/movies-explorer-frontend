import React from 'react';

import './Movies.css';
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../UI/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from '../Footer/Footer';
import PopupBurgerMenu from "../PopupBurgerMenu/PopupBurgerMenu";

function Movies({ movies, isLoading, onSearchMovies, searchQuery, setSearchQuery, 
                  handleCheckbox , notFoundMovies, badMoviesRequest }) {
  
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
        <SearchForm onSearchMovies={onSearchMovies} searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleCheckbox={handleCheckbox}/>
        <MoviesCardList 
          movies= {movies} 
          isLoading={isLoading}
          notFoundMovies={notFoundMovies}
          badMoviesRequest={badMoviesRequest}
         />
        <Footer/>
        {isEditPopupOpen &&  <PopupBurgerMenu onClose={closePopup}/>} 
    </div>
  );
}

export default Movies;
