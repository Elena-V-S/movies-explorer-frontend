import React, { useCallback } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import "./App.css";
import "../../index";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Movies from "../Movies/Movies";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import * as MoviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";
import { path } from "../../constants/path-options";

import {
  filterByWord,
  filterByTime,
  createRegex,
  updateMovies,
  updateMovieData,
} from "../../utils/utils";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [isLogged, setIsLogged] = React.useState(false); // стейт для статуса пользователя
  const [allMovies, setAllMovies] = React.useState([]); //стейт для хранения всех фильмов
  const [findMovies, setFindMovies] = React.useState([]); //стейт для хранения фильмов отобранных по ключевому слову и длительности
  const [movies, setMovies] = React.useState([]); //массив для отрисовки с учетом ранее сохраненных
  const [savedMovies, setSavedMovies] = React.useState([]); //стейт для хранения сохраненных пользователем фильмов
  const [savedMoviesId, setSavedMoviesId] = React.useState([]); //стейт для хранения сохраненных пользователем фильмов
  const [isLoading, setIsLoading] = React.useState(false); // стейт следит за получением ответа от сервера
  const [isSubmited, setIsSubmited] = React.useState(false); // стейт следит за отправкой формы поиска
  const [searchQuery, setSearchQuery] = React.useState(""); // текст запроса
  const [currentUser, setCurrentUser] = React.useState({}); // стейт данных текущего пользователя
  const [isShortMovies, setIsShortMovies] = React.useState(false); //выбраны ли короткометражные фильмы


  const [badRequest, setBadRequest]  = React.useState(false);// отображение сообщения об ошибке
  
   const history = useHistory();

  // обработчик сабмита формы запроса фильмов
  function handleSearchMoviesSubmit() {
    setIsSubmited(true);
    setIsShortMovies(false);
  }

  // добавление фильма в избранное
  function handleMovieLike(movie) {
    MainApi.saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie]);
        setSavedMoviesId([...savedMoviesId, newMovie.movieId]);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  // удаление фильма из избранного
  function handleMovieDelete(movie) {
    MainApi.deleteMovie(movie._id)
      .then(() => {
        const newSavedMovies = savedMovies.filter(
          (savedMovie) => savedMovie._id !== movie._id
        );
        const newIdArray = newSavedMovies.map((movie) => movie.movieId);
        setSavedMovies(newSavedMovies);
        setSavedMoviesId(newIdArray);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    }

  // обработчик сабмита формы регистрации нового пользователя
  function onRegister(name, email, password) {
    MainApi.register(name, email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return res;
        }
      })
      .then(() => {
        setIsLogged(true);
      })
      .catch((err) => {
        if (err === 400) {
          console.log("некорректно заполнено одно из полей");
        }
        setBadRequest(true);
      });
  }

  // обработчик сабмита авторизации пользователя
  function onLogin(email, password) {
    MainApi.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        }
      })
      .then(() => {
        setIsLogged(true);
        setBadRequest(false);
      })
      .catch((err) => {
        console.log(err)
        if (err === 400) {
          console.log("не передано одно из полей");
        } else if (err === 401) {
          console.log("пользователь с email не найден");
        }
        setBadRequest(true);
      });
  }
    // обработчик сабмита формы редактирования профиля
    function handleUpdateUser(name, email) {
      MainApi.patchUserData({ name, email })
        .then((res) => {
          setCurrentUser(res);
          setBadRequest(true);
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    }
  
    //
    function onSignOut() {
      localStorage.removeItem("jwt"); //удалим токен из localStorage
      localStorage.removeItem("AllMovies"); //удалим данные из localStorage
      localStorage.removeItem("moviesWithKeyword"); //удалим данные из localStorage
      setIsLogged(false);
      setFindMovies([]);
      history.push("/");
    }

  // функция проверки валидности токена, если у пользователя есть токен в localStorage
  // и обращение за фильмами добавленными в избранное 
  const tokenCheck = useCallback(() => {
  
    if (localStorage.getItem("jwt")) { // проверим токен
      let jwt = localStorage.getItem("jwt");
      MainApi.getUserData(jwt)
      MainApi.getSavedMovies(jwt)
      MainApi.getAllDates(jwt)
        .then(res => { 
          const [dataUser, dataSavedMovies] = res;
          setIsLogged(true); // авторизуем пользователя
          setCurrentUser(dataUser); // обновим данные пользователя
          setSavedMovies(dataSavedMovies);// обновим стейт с фильмами сохраненными в избранное
          const idArray = dataSavedMovies.map((movie) => movie.movieId);
          setSavedMoviesId(idArray);
          if (localStorage.getItem("AllMovies")) {
            setAllMovies(JSON.parse(localStorage.getItem("AllMovies")));
          }
          if (localStorage.getItem("moviesWithKeyword")) {
            setFindMovies(JSON.parse(localStorage.getItem("moviesWithKeyword")));
          }
          history.push("/movies"); 
          return dataSavedMovies;
        })
        .catch((err) => {
          if (err === 400) {
            console.log("Токен не передан или передан не в том формате");
          } else if (err === 401) {
            console.log("Переданный токен некорректен");
          }
        });
    }
  }, [history]);

  // useEffect при сабмите формы поиска фильмов получаем базу с фильмами из LS или beatfilm-movies
  React.useEffect(() => {
    if (isSubmited) {
      //запрос отправится после сабмита формы
      setIsLoading(true); //до загрузки фильмов отобразим прелоадер
      if (localStorage.getItem("AllMovies")) {
        // проверим есть ли база в LS
        setAllMovies(JSON.parse(localStorage.getItem("AllMovies")));
      } else {
        MoviesApi.getMovies() // запрос за карточками на beatfilm-movies
          .then((data) => {
            if (data) {
              const updateData= data.map((movie) => updateMovieData(movie));
              localStorage.setItem("AllMovies", JSON.stringify(updateData)); // сохраним бaзу в LS
              return updateData;
            }
          })
          .then((updateData) => {
            setAllMovies(updateData);
          })
          .catch((err) => {
            setBadRequest(true);
          });
      }
    }
  }, [isSubmited]);

  // useEffect -  фильтрация по поисковому слову 
  React.useEffect(() => {
    let moviesList;
    if (allMovies.length !== 0 && isSubmited) {
      const regex = createRegex(searchQuery);
      moviesList = filterByWord(allMovies, regex); // фильтруем по тексту поиска 
      // сохраняем в LS результат фильтрации
      localStorage.setItem("moviesWithKeyword", JSON.stringify(moviesList));
      setFindMovies(moviesList);
      setIsLoading(false); // после получения массива для отрисовки остановим прелоадер
      setIsSubmited(false); // меняем состояние переменной, чтобы избежать перерисовки карточек при обновлении поискового запроса до нажатия на кнопку "Найти"
    }
  }, [allMovies, searchQuery, isSubmited]);

// useEffect -  фильтрация по метке "короткомертажки"
  React.useEffect(() => {
    if (allMovies.length !== 0 && isShortMovies) {
      const moviesList = filterByTime(
        JSON.parse(localStorage.getItem("moviesWithKeyword")),
        isShortMovies
      );
      setFindMovies(moviesList);
    } else if (allMovies.length !== 0 && !isShortMovies) {
      setFindMovies(JSON.parse(localStorage.getItem("moviesWithKeyword")));
    }
  }, [isShortMovies, allMovies.length]);

  // обновляем массив фильмов для отрисовки добавляем закрашенные сердечки тем что уже сохранены
  React.useEffect(() => {
    if (findMovies && savedMovies.length === savedMoviesId.length) {
      const moviesList = updateMovies(findMovies, savedMovies, savedMoviesId);
      setMovies(moviesList);
    }
  }, [findMovies, savedMovies, savedMoviesId]);

  // эффект, вызываемый при обновлении isLogged, проверяет валидность токена
  React.useEffect(() => {
    if (path.includes(window.location.pathname)) {
      tokenCheck();
    }
  }, [isLogged, tokenCheck]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Main loggedIn={isLogged} />
          </Route>
          <ProtectedRoute
            path="/movies"
            loggedIn={isLogged}
            component={Movies}
            onSearchMovies={handleSearchMoviesSubmit}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            movies={movies}
            isLoading={isLoading}
            allMovies={allMovies}
            savedMovies={savedMovies}
            savedMoviesId={savedMoviesId}
            handleCheckbox={setIsShortMovies}
            onMovieLike={handleMovieLike}
            onMovieDislike={handleMovieDelete}
            isSubmited={isSubmited}
            isShortMovies={isShortMovies} 
            badRequest={badRequest}
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={isLogged}
            component={SavedMovies}
            savedMovies={savedMovies}
            isLoading={isLoading}
            onMovieDislike={handleMovieDelete}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isShortMovies={isShortMovies} 
            handleCheckbox={setIsShortMovies}  
            isSubmited={isSubmited}
            onSearchMovies={handleSearchMoviesSubmit}
          />
          <ProtectedRoute
            path="/profile"
            loggedIn={isLogged}
            component={Profile}
            onSignOut={onSignOut}
            handleProfileUpdate={handleUpdateUser}
            badRequest={badRequest}
            setBadRequest={setBadRequest}
          />
          <Route path="/signin">
            <Login handleLogin={onLogin} badRequest={badRequest}/>
          </Route>
          <Route path="/signup">
            <Register handleRegister={onRegister} badRequest={badRequest}/>
          </Route>
          <Route path="*">
             <PageNotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

