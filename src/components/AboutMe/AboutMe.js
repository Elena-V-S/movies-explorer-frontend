import React from 'react';

import foto from '../../images/foto.jpg';
import './AboutMe.css';
import SectionHeader from "../SectionHeader/SectionHeader";

function AboutMe() {
  return (
    <section className="student" id="about-me">
        <SectionHeader title='Студент'/>
        <div className="student__container">
            <div className="student__blok">
                <p className="student__name">Виталий</p>
                <p className="student__profession">Фронтенд-разработчик, 30 лет</p>
                <p className="student__description">Я родился и живу в Саратове, закончил факультет экономики СГУ. 
                            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. 
                            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
                            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами 
                             и ушёл с постоянной работы.
                </p>
                <ul className="student__bar">
                  <li><a href="https://github.com/Elena-V-S" className="student__link" target='blanc'>Facebook</a></li>
                  <li><a href="https://github.com/Elena-V-S" className="student__link" target="blank">Github</a></li>
                </ul>
            </div>
            <img className="student__foto" src={foto} alt ="фото"/>
         </div>
      
    </section>
  );
}

export default AboutMe;