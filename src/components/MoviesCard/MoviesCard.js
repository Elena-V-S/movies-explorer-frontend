import React from 'react';
import './MoviesCard.css';


function MoviesCard({ movie, onMovieDislike, onMovieLike, isSaved }) {
// переменная состояния отвечает за лайк
  const [isLiked, setIsLiked] = React.useState(false);

  React.useEffect(() => {
    if (movie._id) {
      setIsLiked(true);
    }
  }, [movie._id]);


  // Создаём переменную, которую после зададим в `className` для кнопки лайка
   const cardLikeButtonClassName = (`movie__button movie__button-like ${ isLiked  ? 'movie__button-like_activ' : ''}`);
   const cardDeleteButtonClassName = 'movie__button movie__button-delete';
  
   // функция вычисляющая длительность фильма в часах и минутах
  function movieDuration(time) {
    const  hours = Math.floor(time / 60);
    const minutes = time % 60;
    return (`${hours}ч ${minutes}м`);
  }
   
  function handleLikeClick() {
    if (isSaved) {
      onMovieDislike(movie);
    } else {
        setIsLiked(!isLiked);
        if (isLiked ) {
          onMovieDislike(movie);
        } else {
           onMovieLike(movie);
        }
      }  
  }

  return (
    <li key={movie._id} className="movie">
        <a href={movie.trailer} className="movie__link"><img className="movie__image" alt="фото" src={movie.image}/></a>
        <div className="movie__grup">
            <h3 className="movie__title">{movie.nameRU}</h3>
            <button type="button" className={isSaved ? cardDeleteButtonClassName : cardLikeButtonClassName} onClick={handleLikeClick}></button>
        </div>
        <div className="movie__durathion">{movieDuration(movie.duration)}</div>
    </li>
  );
}

export default MoviesCard;
