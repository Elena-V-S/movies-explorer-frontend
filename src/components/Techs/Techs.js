import React from 'react';

import SectionHeader from "../SectionHeader/SectionHeader";
import './Techs.css';


function Techs() {
  return (
    <section className="techs" id="techs">
        <SectionHeader title='Технологии'/>
        <div className="techs__container">
            <p className="techs__subtitle">7 технологий</p>
            <p className="techs__comments">На курсе веб-разработки мы освоили технологии, 
            которые применили в дипломном проекте.
            </p>
            <ul className="techs__bar">
                <li className="techs__elem">HTML</li>
                <li className="techs__elem">CSS</li>
                <li className="techs__elem">JS</li>
                <li className="techs__elem">React</li>
                <li className="techs__elem">Git</li>
                <li className="techs__elem">Express.js</li>
                <li className="techs__elem">mongoDB</li>
            </ul>
        </div>
    </section>
  );
}

export default Techs;