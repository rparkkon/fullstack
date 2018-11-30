import React from 'react'
import {anecdoteCreate} from '../reducers/anecdoteReducer'
import {notificationChange} from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    //const content = e.target.anecdote.value
    //const toDispatch = anecdoteCreate(content);
    //console.log('toDispatch: ', toDispatch)

    this.props.store.dispatch(anecdoteCreate(e.target.anecdote.value))
    this.props.store.dispatch(notificationChange(e.target.anecdote.value))
    setTimeout(() => {this.props.store.dispatch(notificationChange(''))}, 5000) 
    e.target.anecdote.value = ''
  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}

export default AnecdoteForm
