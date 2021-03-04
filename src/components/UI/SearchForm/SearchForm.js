import React from 'react';
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";


function SearchForm() {

  return (
    <div className="search">
        <form htmlFor="movie" className="search__form">
            <input id="movie" type="text" name="movie" className="search__input" placeholder="Фильм" minLength='2' maxLength='200' required/>
            <button type="submit" className="search__button" />
        </form>
        <FilterCheckbox/>
    </div>
  );
}

export default SearchForm;
