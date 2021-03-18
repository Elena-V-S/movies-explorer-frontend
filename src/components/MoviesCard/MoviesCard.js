import React from 'react';

import './MoviesCard.css';

import movie from "../../images/movie.jpg";


function MoviesCard() {
  return (
    <li key={movie._id} className="movie">
        <img className="movie__image" alt="фото" src={movie} />
        <div className="movie__grup">
            <h3 className="movie__title" >33 слова о дизайне</h3>
            <button type="button" className="movie__button movie__button_activ" ></button>
        </div>
        <div className="movie__durathion">1ч42м</div>
    </li>
      
    
  );
}

export default MoviesCard;