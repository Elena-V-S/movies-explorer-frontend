import React from 'react';
import movieImg from "../../images/movie.jpg";
import './MoviesCard.css';


function MoviesCard({ movie, onMovieDislike, onMovieLike, isSaved }) {
// переменная состояния отвечает за лайк
  const [isLiked, setisLiked] = React.useState(false);
  
  // // Создаём переменную, которую после зададим в `src` для img
  const movieURL = ((movie.image === null) ? movieImg : `https://api.nomoreparties.co${movie.image.url}`);
  const savedMovieURL = ((movie.image === null) ? movieImg : `${movie.image}`);
 
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
   const cardLikeButtonClassName = (`movie__button movie__button-like ${ isLiked ? 'movie__button-like_activ' : ''}`);
   const cardDeleteButtonClassName = 'movie__button movie__button-delete';
  
   // функция вычисляющая длительность фильма в часах и минутах
  function movieDuration(time) {
    const  hours = Math.floor(time / 60);
    const minutes = time % 60;
    return (`${hours}ч ${minutes}м`);
  }
  
  function handleLikeClick() {
    if (!isSaved) {
      setisLiked(!isLiked);
      isLiked ? onMovieDislike(movie) : onMovieLike(movie);
    } else {
      onMovieDislike(movie);
    }
   
}

  return (
    <li key={movie._id} className="movie">
        <a href={movie.trailerLink} className="movie__link"><img className="movie__image" alt="фото" src={isSaved ?  savedMovieURL : movieURL}/></a>
        <div className="movie__grup">
            <h3 className="movie__title">{movie.nameRU}</h3>
            <button type="button" className={isSaved ? cardDeleteButtonClassName : cardLikeButtonClassName} onClick={handleLikeClick}></button>
        </div>
        <div className="movie__durathion">{movieDuration(movie.duration)}</div>
    </li>
  );
}

export default MoviesCard;