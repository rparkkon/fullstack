import { createStore, combineReducers } from 'redux'
import anecdoteReducer, {anecdoteCreate} from './reducers/anecdoteReducer'
import notificationReducer, {notificationChange} from './reducers/notificationReducer'
import filterReducer, {filterChange} from './reducers/filterReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  })

const store = createStore(reducer)

console.log(store.getState())
store.dispatch(notificationChange('')) // No notification is set!'))
store.dispatch(anecdoteCreate('combineReducers muodostaa yhdistetyn reducerin'))  
store.dispatch(filterChange('')) // 'No filter is set!'))

export default store