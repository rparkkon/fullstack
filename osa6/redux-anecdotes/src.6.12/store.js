import { createStore, combineReducers } from 'redux'
import anecdoteReducer, {anecdoteInsert} from './reducers/anecdoteReducer'
import notificationReducer, {notificationChange} from './reducers/notificationReducer'
import filterReducer, {filterChange} from './reducers/filterReducer'
import service from './services/anecdotes'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  })

const store = createStore(reducer)


service.getAll().then(anecdotes =>
  anecdotes.forEach(anecdote => {
    console.log('STORE:' , store.getState())
    store.dispatch(anecdoteInsert(anecdote))
  })
)

console.log('STORE:' , store.getState())
store.dispatch(notificationChange('')) // No notification is set!'))
//store.dispatch(anecdoteCreate('combineReducers muodostaa yhdistetyn reducerin'))  
store.dispatch(filterChange('')) // 'No filter is set!'))

export default store