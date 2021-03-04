import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import '../../index';

import Movies from "../Movies/Movies";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";




function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    console.log(isEditProfilePopupOpen)
  }

  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Main onEditProfile={handleEditProfileClick} />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
