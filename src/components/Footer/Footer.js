import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
        <p className="footer-title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer-bottom">
          <p className="footer__copyright">&copy; 2020</p>
          <ul className="footer__list">
            <li className="footer__elem"><a href="https://praktikum.yandex.ru/profile/web/"  className="footer__link" target='blanc'>Яндекс.Практикум</a></li>
            <li className="footer__elem"><a href="https://github.com/Elena-V-S"  className="footer__link" target='blanc'>Github</a></li>
            <li className="footer__elem"><a href="https://github.com/Elena-V-S"  className="footer__link" target='blanc'>Facebook</a></li>
          </ul>
        </div>
    </footer>
  );
}

export default Footer;