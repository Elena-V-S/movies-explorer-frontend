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
import * as MoviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";
import { filter, createRegex } from "../../utils/utils";
import ProtectedRoute from "../ProtectedRoute";

function App() {
  const [isLogged, setIsLogged] = React.useState(false); // стейт для статуса пользователя
  const [allMovies, setAllMovies] = React.useState([]); //стейт для хранения всех фильмов
  const [movies, setMovies] = React.useState([]); //стейт для хранения фильмов отобранных по ключевому слову
  const [isLoading, setIsLoading] = React.useState(false); // стейт следит за получением ответа от сервера
  const [isSubmited, setIsSubmited] = React.useState(false); // стейт следит за отправкой формы поиска
  const [searchQuery, setSearchQuery] = React.useState(""); // текст запроса
  const [badRequest, setBadRequest] = React.useState(false); // стейт для ошибки ответа сервера при регистрации
  const [currentUser, setCurrentUser] = React.useState({}); // стейт данных текущего пользователя
  const [isShortMovies, setIsShortMovies] = React.useState(false); //выбраны ли короткометражные фильмы
  const [badMoviesRequest, setBadMoviesRequest] = React.useState(false); //оповещение- ошибка запроса фильмов


  const history = useHistory();


  // useEffect при сабмите формы поиска фильмов получаем базу с фильмами из LS или beatfilm-movies
  React.useEffect(() => {
    if (isSubmited) {  //запрос отправится после сабмита формы
      setIsLoading(true); //до загрузки фильмов отобразим прелоадер
      if (localStorage.getItem('AllMovies')) {   // проверим есть ли база в LS
        setAllMovies(JSON.parse(localStorage.getItem('AllMovies')));
      } else {
        MoviesApi.getMovies() // запрос за карточками на beatfilm-movies
          .then((data) => {
            if (data) {
              localStorage.setItem("AllMovies", JSON.stringify(data)); // сохраним бaзу в LS
               return data;
            }
          })
          .then((movies) => { setAllMovies(movies) })
          .catch((err) => {
            setBadMoviesRequest(true);
          });
      }
    }
  }, [isSubmited]);


 // useEffect -  фильтрация по поисковому слову и метке короткомертажки 
  React.useEffect(() => {
    if (allMovies.length !== 0 && isSubmited) {
      const regex = createRegex(searchQuery);
      const moviesWithKeyword = filter( allMovies, regex, isShortMovies ); // фильтруем по тексту поиска и метке короткометражки
      // сохраняем в LS результат фильтрации
      localStorage.setItem(
        "moviesWithKeyword",
        JSON.stringify(moviesWithKeyword)
      ); 
      setMovies(moviesWithKeyword);
      setIsLoading(false); // после получения массива для отрисовки остановим прелоадер
      setIsSubmited(false);// меняем состояние переменной, чтобы избежать автоматической перерисовки карточек при обновлении поискового запроса
    }
  }, [ allMovies, searchQuery, isShortMovies, isSubmited ]);
  

  // обработчик сабмита формы запроса фильмов
  function handleSearchMoviesSubmit() {
    setIsSubmited(true);
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
      })
      .catch((err) => {
        if (err === 400) {
          console.log("не передано одно из полей");
        } else if (err === 401) {
          console.log("пользователь с email не найден");
        }
        setBadRequest(true);
      });
  }
  function onSignOut() {
    localStorage.removeItem("jwt"); //удалим токен из localStorage
    localStorage.removeItem("AllMovies"); //удалим токен из localStorage
    localStorage.removeItem("moviesWithKeyword"); //удалим токен из localStorage
    setIsLogged(false);
    setMovies([]);
    history.push("/");
  }

  // функция проверки валидности токена, если у пользователя есть токен в localStorage
  const tokenCheck = useCallback(() => {
    if (localStorage.getItem("jwt")) {
      // проверим токен
      let jwt = localStorage.getItem("jwt");
      MainApi.getContent(jwt)
        .then((user) => {
          console.log(user);
          setIsLogged(true); // авторизуем пользователя
          setCurrentUser(user); // обновим данные пользователя
          history.push("/movies"); // перенаправим на страницу с фильмами
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

  // эффект, вызываемый при обновлении loggedIn, проверяет валидность токена
  React.useEffect(() => {
    tokenCheck();
  }, [isLogged, tokenCheck]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Main loggedIn={isLogged}/>
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
            handleCheckbox={setIsShortMovies}
            badMoviesRequest={badMoviesRequest}
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={isLogged}
            component={SavedMovies}
            movies={movies}
            isLoading={isLoading}
          />
          <ProtectedRoute
            path="/profile"
            loggedIn={isLogged}
            component={Profile}
            onSignOut={onSignOut}
          />
          <Route path="/signin">
            <Login handleLogin={onLogin} />
          </Route>
          <Route path="/signup">
            <Register handleRegister={onRegister} badRequest={badRequest} />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

