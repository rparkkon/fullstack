import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <div><App store={store}/></div>
  </Provider>,
document.getElementById('root'))
