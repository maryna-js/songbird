import React from 'react';
import logo from './images/logo2.png';

const Header = () => {
  return (
    <>
      <div className="header">
        <img src={logo} alt="img" className="header__logo"/>
        <div className="header__score">
          <div className="mb-0 header__score-item">Score: </div>
          <div>11</div>
        </div>
      </div>
      <div className = "header__nav">
      <button type="button" class="btn btn-success header__menu">Перелетные</button>
      <button type="button" class="btn btn-success header__menu">Домашние</button>
      <button type="button" class="btn btn-success header__menu">Оседлые</button>
      <button type="button" class="btn btn-success header__menu">Морские</button>
      <button type="button" class="btn btn-success header__menu">Хищные</button>
      <button type="button" class="btn btn-success header__menu">Певчие</button>
      </div>
      {/* <nav className="nav navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="nav__menu navbar-nav mr-auto">
          <li className="navbar-brand nav-item">
            <a href = "./razminka.html" className = "nav-link">Разминка</a></li>
          <li className="navbar-brand nav__menu-item">Перелетные</li>
          <li className="navbar-brand nav__menu-item">Лесные птицы</li>
          <li className="navbar-brand nav__menu-item">Певчие птицы</li>
          <li className="navbar-brand nav__menu-item">Хищные птицы</li>
          <li className="navbar-brand nav__menu-item">Морские птицы</li>
        </ul>
      </nav> */}
    </>
  );
};

export default Header;
