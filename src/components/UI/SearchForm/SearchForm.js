import React from 'react';
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({searchQuery, setSearchQuery, onSearchMovies, handleCheckbox }) {

  const [errorInput, setErrorInput] = React.useState(false);
    // обработчик сабмита формы
    function handleSubmit(evt) {
      evt.preventDefault();
      if (searchQuery === '') {
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

  return (
    <div className="search">
        <form htmlFor="movie" className="search__form" onSubmit={handleSubmit}>
            <input id="search" name="search" type="text" 
                className="search__input" 
                placeholder="Фильм"
                value={searchQuery} 
                onChange={handleQueryChange}
            />
            {errorInput && <div className="search__input-error">Нужно ввести ключевое слово</div>}
            <button type="submit" className="search__button" onClick={handleSubmit}/>
        </form>
        <FilterCheckbox handleCheckbox={handleCheckbox}/>
    </div>
  );
}

export default SearchForm;
