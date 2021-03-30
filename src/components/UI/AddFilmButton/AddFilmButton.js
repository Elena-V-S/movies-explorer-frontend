import React from 'react';

import './AddFilmButton.css';

function AddFilmButton({onClick}) {
  return (
    <button className="add-button" onClick={onClick}>Ещё</button>
  );
}

export default AddFilmButton;