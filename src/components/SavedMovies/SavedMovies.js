import React from 'react';

import './SavedMovies.css';
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../UI/SearchForm/SearchForm";
import Footer from '../Footer/Footer';
import PopupBurgerMenu from "../PopupBurgerMenu/PopupBurgerMenu";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import { filterByWord, createRegex, filterByTime } from "../../utils/utils";

function SavedMovies({savedMovies, isLoading, onMovieDislike, searchQuery, setSearchQuery, isShortMovies, handleCheckbox, onSearchMovies, isSubmited }) {

const [savedMovieForRender, setSavedMovieForRender ] = React.useState(savedMovies);
const [isEditPopupOpen, setIsEditPopupOpen] = React.useState(false);
const [shortSavedMovies, setShortSavedMovies] = React.useState([]);

  React.useEffect(() => {
    setSearchQuery("");
    handleCheckbox(false);
    setSavedMovieForRender(savedMovies);
  }, [ setSearchQuery, handleCheckbox, savedMovies, setSavedMovieForRender ]);
 
  function handleEditPopupClick() { 
    setIsEditPopupOpen(true);
  } 

  function closePopup(){ 
    setIsEditPopupOpen(false); 
  }

//  фильтрация по длительности
  React.useEffect(() => {
    if (!isShortMovies ) {
      setShortSavedMovies(filterByTime(savedMovieForRender));
    } 
  }, [isShortMovies, savedMovieForRender]);
//  фильтрация по запросу
  React.useEffect(() => {
    if (isSubmited ) {
     setSavedMovieForRender(filterByWord(savedMovies, createRegex(searchQuery)));
    } 
  }, [isSubmited, savedMovies, searchQuery]);

  function handleCheckboxForSavedMovies() {
    handleCheckbox(!isShortMovies);
  }

  return (
    <div className="saved-movies">
        <Header children={ < Navigation onEditPopup={handleEditPopupClick}/> } color= {'#FFFFFF'} />
        <SearchForm onSearchMovies={onSearchMovies} searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleCheckbox={handleCheckboxForSavedMovies} isShortMovies={isShortMovies} isSaved = {true}/>
        <MoviesCardList  
          movies= {isShortMovies ? shortSavedMovies : savedMovieForRender} 
          isLoading={isLoading}
          isSaved = {true}
          onMovieDislike={onMovieDislike}
          />
        <Footer/>
        {isEditPopupOpen &&  <PopupBurgerMenu onClose={closePopup}/>} 
    </div>
  );
}

export default SavedMovies;