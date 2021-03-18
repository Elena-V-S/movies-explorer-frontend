import React from 'react';

function InfoTooltip({ isOpen, onClose, result}) {
  return (
    <div className={`popup ${isOpen  && 'popup_opened'}`}>
      <div className="popup__container">
        <button onClick={onClose} type="button" className="popup__close"></button>
        <div className={ result ? 'popup__success' : 'popup__fail'}  />
      </div>
    </div>
      )
    }
    
export default InfoTooltip;
