import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { addApplication } from './redux/actions';

//STORE -> GLOBALIZED STATE / INSIDE REDUX/STORE.JS
window.store = store
window.addApplication = addApplication;

//ACTION CREATORS INSIDE REDUX/ACTIONS.JS

//REDUCER INSIDE REDUX/REDUCERS.JS

//DISPATCH

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
