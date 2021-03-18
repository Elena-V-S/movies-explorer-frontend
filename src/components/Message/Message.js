import React from 'react'
import './Message.css'

const Message = ({isEditMessageType}) => {
    return (
        <>
        { (isEditMessageType===1) ? ( 
            
               <p className="message">Ничего не найдено</p> 
               ) : ( 
                <p className="message">Во время запроса произошла ошибка. 
            Возможно, проблема с соединением или сервер недоступен. 
            Подождите немного и попробуйте ещё раз</p> 
            )}    
        </>
    )
};

export default Message;