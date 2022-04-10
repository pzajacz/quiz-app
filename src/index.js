import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
/*import reportWebVitals from './reportWebVitals';*/
import GlobalStyle from "./GlobalStyle";
import ReactGA from 'react-ga';

ReactGA.initialize('UA-220164940-1');
ReactGA.pageview(window.location.pathname);

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
