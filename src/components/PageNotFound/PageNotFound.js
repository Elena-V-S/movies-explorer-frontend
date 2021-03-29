import React from 'react';
import {useHistory} from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {

  const history = useHistory(); 

  function handleOnClick() {
    history.goBack();
  } 

  return (
    <div className="not-found">
      <h3 className="not-found__title">404</h3>
      <p className="not-found__text">Страница не найдена</p>
      <button className="not-found__button" onClick={handleOnClick}>Назад</button>
    </div>
  )
}

export default PageNotFound; 