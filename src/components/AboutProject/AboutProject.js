import React from 'react';

import './AboutProject.css';
import SectionHeader from "../SectionHeader/SectionHeader";


function AboutProject() {
  return (
    <section className="about-project" id="about-project">
        <SectionHeader title='О проекте'/>
        <div className="about-project__container">
          <div className="about-project__section">
              <h4 className="about-project__title">Дипломный проект включал 5 этапов</h4>
              <p className="about-project__description">Составление плана, работу над бэкендом, вёрстку, 
               добавление функциональности и финальные доработки.</p>
            </div>
            <div className="about-project__section">
              <h4 className="about-project__title">На выполнение диплома ушло 5 недель</h4>
              <p className="about-project__description">У каждого этапа был мягкий и жёсткий дедлайн, 
               которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
        </div>
        <div className="about-project__block">
            <div className="about-project__chart about-project__chart_green">1 неделя</div>
            <div className="about-project__chart about-project__chart_white">4 недели</div>
            <div className="about-project__label">Back-end</div>
            <div className="about-project__label">Front-end</div>
        </div>
      
    </section>
  );
}

export default AboutProject;