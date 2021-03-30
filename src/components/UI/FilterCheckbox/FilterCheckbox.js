import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox( { handleCheckbox, isShortMovies }) {

  function onChange() {
    handleCheckbox(!isShortMovies);
  }

  return (
    <form className="filter">
        <label className="filter__label">Короткометражки
            <input type="checkbox" checked={isShortMovies} onChange={onChange} className="filter__checkbox-invisible"/>
            <div  className={`filter__button ${ isShortMovies ? 'filter__button_activ' : 'filter__button_inactiv' }`}/>
        </label>
    </form>
  );
}
export default FilterCheckbox;