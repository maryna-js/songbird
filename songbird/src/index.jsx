import React from 'react';
// import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
// import { hot } from 'react-hot-loader';
import img from '../public/header.jpg';

import './index.scss';

import '@babel/polyfill';

function App() {
  return (
    <>
      <div className="red-text">Hello Ann</div>
      <img src={img} alt="img" />
    </>
  );
}

// const AppWithHot = hot(module)(App);

const mountNode = document.getElementById('app');
ReactDOM.render(<App name="Jane" />, mountNode);
