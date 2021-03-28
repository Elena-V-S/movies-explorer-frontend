import React from 'react';
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({searchQuery, setSearchQuery, onSearchMovies, handleCheckbox, isShortMovies, isSaved }) {

  const [errorInput, setErrorInput] = React.useState(false);
    // обработчик сабмита формы
    function handleSubmit(evt) {
      evt.preventDefault();
      // handleCheckbox(false);
      if (isSaved && searchQuery === '') {
        setErrorInput(false);
      }
      if (!isSaved && searchQuery === '') {
        setErrorInput(true);
      } else {
        setErrorInput(false);
        onSearchMovies();
      }
    }
  // Обработчик изменения инпута обновляет стейт 
  function handleQueryChange(e) {
    setSearchQuery(e.target.value);
  }
  function onKeyDown(evt) {
    if (evt.key === 'Enter') {
      handleSubmit(evt);
    }
  }
  return (
    <div className="search">
        <form htmlFor="movie" className="search__form" onSubmit={handleSubmit}>
            <input id="search" name="search" type="text" onKeyDown={onKeyDown}
                className="search__input" 
                placeholder="Фильм"
                value={searchQuery} 
                onChange={handleQueryChange}
            />
            {errorInput && <div className="search__input-error">Нужно ввести ключевое слово</div>}
            <button type="submit" className="search__button" onClick={handleSubmit}/>
        </form>
        <FilterCheckbox handleCheckbox={handleCheckbox} isShortMovies={isShortMovies}/>
    </div>
  );
}

export default SearchForm;
