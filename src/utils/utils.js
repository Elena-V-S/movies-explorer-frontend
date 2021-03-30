export const filterByWord = (movies, regex) => {
  return movies.filter((movie) => regex.test(movie.nameRU));
};

export const filterByTime = (movies) => {
  return movies.filter((movie) => movie.duration < 41);
};

export const createRegex = (word) => new RegExp(`${word}`, "gi");

// вычисляем кол-во фильмов для отрисовки
export const calculate = (pageWidth) => {
  let startNumber, addNumber;
  if (pageWidth > 768) {
    startNumber = 12;
    addNumber = 4;
  } else if (pageWidth > 480) {
    startNumber = 8;
    addNumber = 2;
  } else {
    startNumber = 5;
    addNumber = 2;
  }
  return { startNumber, addNumber };
};
// функция проверяет сохранен ли этот фильм и добавляет закрашенные сердечки тем что уже сохранены
// и удаляем у тех фильмов, что удалены из сохраненных
export const updateMovies = (arrMovies, arrSavedMovies, arrSavedMoviesId) => {
  return arrMovies.map((movie) => {
    if (arrSavedMoviesId.includes(movie.movieId)) {
      const Id = movie.movieId;
      movie._id = arrSavedMovies.find(
        (savedMovie) => savedMovie.movieId === Id
      )._id;
      return movie;
    } else {
      if (movie._id) {
        let newMovie = { ...movie };
        delete newMovie._id;
        return newMovie;
      } else {
        return movie;
      }
    }
  });
};
// преобразуем данные полученные из базы
export const updateMovieData = (movie) => {
  const pattern=/^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*)(?::\d{2,})?(?:[\/?#]\S*)?$/
  const movieId = movie.id;
  const director = movie.director === null ? " " : movie.director;
  const duration = movie.duration === null ? " " : movie.duration;
  const year = movie.year === null ? " " : movie.year;
  const description = movie.description === null ? " " : movie.description;
  const nameRU = movie.nameRU === null ? " " : movie.nameRU;
  const nameEN = movie.nameEN === null ? " " : movie.nameEN;
  const country = movie.country === null ? " " : movie.country;
  const image =
    movie.image === null
      ? "https://www.efcate.com/wp-content/uploads/2020/11/dc5f95a6bc70dc7c9973a2b6fba5a98c.jpg"
      : `https://api.nomoreparties.co${movie.image.url}`;
  const thumbnail =
    movie.image === null
      ? "https://www.efcate.com/wp-content/uploads/2020/11/dc5f95a6bc70dc7c9973a2b6fba5a98c.jpg"
      : `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`;
        
  const trailer = (movie.trailerLink === null || !pattern.test(movie.trailerLink)) 
  ? "https://www.efcate.com/wp-content/uploads/2020/11/dc5f95a6bc70dc7c9973a2b6fba5a98c.jpg" 
  : movie.trailerLink;

  return {
    movieId,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
  };
};
