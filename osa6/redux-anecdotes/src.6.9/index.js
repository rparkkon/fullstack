import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App';
//import store from './store'
import anecdoteReducer, {anecdoteCreate} from './reducers/anecdoteReducer'
import notificationReducer, {notificationChange} from './reducers/notificationReducer'
import filterReducer, {filterChange} from './reducers/filterReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer
})

const store = createStore(reducer)
console.log('STORE.getState: ', store.getState())


ReactDOM.render(
  <Provider store={store}>
    <div><App store={store}/></div>
  </Provider>,
document.getElementById('root'))
