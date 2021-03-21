import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox( { handleCheckbox }) {

  const [isChecked, setIsChecked] = React.useState(false);// состояние чекбокса
 
  function onChange() {
    handleCheckbox(!isChecked);
    setIsChecked(!isChecked);
  }
  console.log()
  
  return (
    <form className="filter">
        <label className="filter__label">Короткометражки
            <input type="checkbox" checked={isChecked} onChange={onChange} className="filter__checkbox-invisible"/>
            <div  className={`filter__button ${ isChecked ? 'filter__button_activ' : 'filter__button_inactiv' }`}/>
        </label>
        
    </form>
  );
  }

    export default FilterCheckbox;