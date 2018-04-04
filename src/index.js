/*global module,document*/
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';

//Base stylesheet
import './assets/scss/main.scss';

const title = 'My Minimal Setup';

ReactDOM.render(
  <div className="title">{title}</div>,
  document.getElementById('app')
);

//Hot reloading without F5 in browser
module.hot.accept();
