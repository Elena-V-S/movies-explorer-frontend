import React from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    return (
        <section className="movies__blok"> 
            <ul className="movies__list"> 
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
            </ul> 
        </section> 
      );
    }
    export default MoviesCardList;