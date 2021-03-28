import React from 'react';

import './Movies.css';
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../UI/SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from '../Footer/Footer';
import PopupBurgerMenu from "../PopupBurgerMenu/PopupBurgerMenu";

function Movies({ movies, isLoading, allMovies, onSearchMovies, searchQuery, setSearchQuery, 
                  handleCheckbox , notFoundMovies, badMoviesRequest, onMovieLike, onMovieDislike, isSubmited, isShortMovies }) {
  
  const [isEditPopupOpen, setIsEditPopupOpen] = React.useState(false);
  
  React.useEffect(() => {
    setSearchQuery("");
    handleCheckbox(false);
  }, [ setSearchQuery, handleCheckbox ]);

  function handleEditPopupClick() { 
    setIsEditPopupOpen(true); 
  } 
  function closePopup(){ 
    setIsEditPopupOpen(false); 
  }
  
  return (
    <div className="movies"> 
        <Header children={ < Navigation onEditPopup={handleEditPopupClick}/> } color= {'#FFFFFF'} />
        <SearchForm onSearchMovies={onSearchMovies} searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleCheckbox={handleCheckbox} isShortMovies={isShortMovies} />
        <MoviesCardList 
          movies= {movies} 
          isLoading={isLoading}
          allMovies={allMovies}
          notFoundMovies={notFoundMovies}
          badMoviesRequest={badMoviesRequest}
          onMovieLike={onMovieLike}
          onMovieDislike={onMovieDislike}
          isSubmited={isSubmited}
         />
        <Footer/>
        {isEditPopupOpen &&  <PopupBurgerMenu onClose={closePopup}/>} 
    </div>
  );
}

export default Movies;
