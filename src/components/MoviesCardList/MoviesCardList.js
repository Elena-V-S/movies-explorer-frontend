import React from 'react';
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "..//Preloader/Preloader";
import AddFilmButton from "../UI/AddFilmButton/AddFilmButton";
import { calculate } from "../../utils/utils";

function MoviesCardList({ movies, isLoading, badMoviesRequest }) {

  const [windowWidth, setWindowWidth] = React.useState(window.screen.width);
  const [countRenderedMovies, setCountRenderedMovies] = React.useState(0); // счетчик отрисованных карточек фильмов 
  const [addRenderedMovies, setAddRenderedMovies] = React.useState(0); 
  
  let timer; // переменная, хранящая идентификатор таймера
  
  // в зависимости от ширины окна вычисляем значения сколько фильмов будет отображено сначала 
  // и сколько будет добавлено при клике на кнопку Ещё
   React.useEffect(() => {
 
    console.log(windowWidth)
    const { startNumber, addNumber } = calculate(windowWidth);
    console.log(startNumber)
    setCountRenderedMovies(startNumber);
    setAddRenderedMovies(addNumber);
  }, [windowWidth]);
   
  // функция запускает таймер, который изменит значение windowWidth через 2 сек 
  // или остановит таймер, если он уже запущен
   function  resizedWindow() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => setWindowWidth(window.screen.width), 2000);
  };

  // эффект срабатывает если пользователь изменяет размер окна браузера
  React.useEffect(() => {
    window.addEventListener('resize', resizedWindow);

    return () => window.removeEventListener('resize',  resizedWindow);
  });

  // обработчик клика на кнопку Ещё 
    function handleAddButton() {
      setCountRenderedMovies(countRenderedMovies + addRenderedMovies);
    }

    return (
      <>
        <section className="movies__blok"> 
            {isLoading 
            ? <Preloader/>
            : <ul className="movies__list"> 
                 { movies.reduce((moviesToRender, movie) => {
                if (moviesToRender.length < countRenderedMovies) {
                  moviesToRender.push(
                    <MoviesCard
                      movie={movie}
                      key={movie.id}
                    />,
                  );
                }
                return moviesToRender;
              }, [])
            }
              </ul>
            }
            {(movies.length === 0 && isLoading) && <p className="movies-notFound">Ничего не найдено</p>}
            {badMoviesRequest && <p className="movies-notFound">Во время запроса произошла ошибка.
             Возможно, проблема с соединением или сервер недоступен. 
             Подождите немного и попробуйте ещё раз</p>}
        
        </section> 
        {movies.length > countRenderedMovies && <AddFilmButton onClick={handleAddButton} />}
      </>
      );
    }
    export default MoviesCardList;
