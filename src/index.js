import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import myReducer from './reducers/index'

import { createStore } from 'redux'

import { Provider } from 'react-redux'

const store = createStore(myReducer)

ReactDOM.render(
  <Provider store = { store }>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
