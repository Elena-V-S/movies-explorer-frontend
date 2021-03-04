import React from 'react';
import './FilterCheckbox.css';


function FilterCheckbox(props) {
    const [duration, setDuration] = React.useState(true);

    function handleDurationChange(e) {
            setDuration(false);
          }

    return (
        <form onSubmit={props.handleSubmit} className="filter">
            <label className="filter__label">Короткометражки
                <input type="checkbox" checked={duration} onChange={handleDurationChange} className="filter__checkbox-invisible"/>
                <div className="filter__checkbox-visible filter__checkbox-visible_activ"/>
            </label>
            
        </form>
      );
    }

    export default FilterCheckbox;