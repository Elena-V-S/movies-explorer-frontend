import React from 'react';


import './Portfolio.css';
import SectionHeader from "../SectionHeader/SectionHeader";


function Portfolio() {
  return (
    <section className="portfolio"> 
      <SectionHeader title='Портфолио'/>
      <ul className="portfolio__list">
          <li className="portfolio__item">
            <p className="portfolio__item-title">Статичный сайт</p>
            <a href="https://github.com/Elena-V-S" target='blanc'><div className='portfolio__arrow'/></a>
          </li>
          <li className="portfolio__item">
            <p className="portfolio__item-title">Адаптивный сайт</p>
            <a href="https://elena-v-s.github.io/russian-travel/" target='blanc'><div className='portfolio__arrow'/></a>
          </li>
          <li className="portfolio__item">
            <p className="portfolio__item-title">Одностраничное приложение</p>
            <a href="https://ev-mesto.students.nomoredomains.rocks" target='blanc'><div className='portfolio__arrow'/></a>
          </li>
      </ul>
    </section>
  );
}

export default Portfolio;