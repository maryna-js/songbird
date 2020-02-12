import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
// import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
// import { hot } from 'react-hot-loader';
// import img from '../public/header.jpg';
// import './bootswatch/_variables.scss';
// import 'bootstrap/scss/bootstrap.scss';
// import './bootswatch/_bootswatch.scss';
import './index.scss';

import '@babel/polyfill';
// import Header from './components/header/header';
import QuestionBlock from './components/questionBlock/questionBlock';
import Summary from './components/summary/Summary.jsx';

function App() {
  return (
    // <>
    // <Header />
    // <QuestionBlock />
    // <Summary />
    // <Router>
    //   <Route path ='/play' exact component={Summary} />
    //   </Router>
    // </>

    <Router>
    {/* <Header /> */}
    {/* <QuestionBlock />
    <Summary /> */}

    <Route exact path='/' component={QuestionBlock} />
          <Route path='/summary' component={Summary} />

          </Router>

    // <>
    //   <h1>SongBird</h1>
    //   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    //     <a className="navbar-brand" href="https://test.com">
    //       Navbar
    //     </a>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-toggle="collapse"
    //       data-target="#navbarColor02"
    //       aria-controls="navbarColor02"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon" />
    //     </button>
    //   </nav>
    //   <div className="red-text">Hello Ann</div>
    //   <img src={img} alt="img" />
    // </>
  );
}

// const AppWithHot = hot(module)(App);

const mountNode = document.getElementById('app');
ReactDOM.render(<App name="Jane" />, mountNode);
