export const filter = ( movies, regex, isShortMovies ) => {
    if (isShortMovies) {
        return movies.filter((movie) => regex.test(movie.nameRU)).filter((movie) => movie.duration < 41);
    }
    return movies.filter((movie) => regex.test(movie.nameRU));
  }; 

export const createRegex = (word) => new RegExp(`${word}`, 'gi');

// вычисляем кол-во фильмов для отрисовки
export const  calculate = (pageWidth) => {
    let startNumber, addNumber ;
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
    return {startNumber, addNumber };

}
    
    