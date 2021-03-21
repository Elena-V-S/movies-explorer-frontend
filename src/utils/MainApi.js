export const BASE_URL = 'https://api.e-movie.students.nomoredomains.rocks';
export const headersAuth = {
  'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  'Content-Type': 'application/json'
}
function getResponseData(res) {
  if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`)); 
} 

export const register = ( name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ name, email, password })
    
    })
    .then(res => {
      return getResponseData(res);
  })
  }; 

  export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8" 
      },
      body: JSON.stringify({email, password})
    })
    .then(res => {
      return getResponseData(res);
  })
  };

  export const getUserData = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json; charset=utf-8" ,
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res => {
      return getResponseData(res);
  })
  }
  // Редактирование профиля
  export const patchUserData = ({name, email}) => { 
    return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    body: JSON.stringify({
        name: name,
        email: email 
        }),
        headers: headersAuth,
    })
    .then(res => {
        return getResponseData(res);
    }) 
}
  //Сохраняем фильм в нашей базе
  export const saveMovie  = ({movieId, country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail }) => {
            return fetch(`${BASE_URL}/movies`, {
            method: 'POST',
            body: JSON.stringify({ 
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
                thumbnail 
            }),
            headers: headersAuth,
            })
            .then(res => { 
                return getResponseData(res); 
            }) 
        } 

  export const deleteMovie = (movieId) => {
    return fetch(`${BASE_URL}/movies/${movieId}`, { 
      method: 'DELETE',
      headers: headersAuth,
      })
      .then(res => { 
          return getResponseData(res); 
      }) 
  }

   //запрашиваем сохраненные фильмы 
   export const getSavedMovies = () => { 
    return fetch(`${BASE_URL}/movies`, { 
      headers: headersAuth,
    }) 
    .then(res => { 
        return getResponseData(res); 
    })
} 
// export const getAllDates() { 
//     return Promise.all([getSavedMovies(), this.getInitialCards()]) 
// } 