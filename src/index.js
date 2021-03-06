import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
// import App from './App';
import Testhttp from './Testhttp';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Testhttp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
