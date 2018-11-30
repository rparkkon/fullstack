import React from 'react'
import PropTypes from 'prop-types'
import {anecdoteCreate} from '../reducers/anecdoteReducer'
import {notificationChange} from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }


  handleSubmit = (e) => {
    e.preventDefault()
    //const content = e.target.anecdote.value
    //const toDispatch = anecdoteCreate(content);
    //console.log('toDispatch: ', toDispatch)

    this.context.store.dispatch(anecdoteCreate(e.target.anecdote.value))
    this.context.store.dispatch(notificationChange(e.target.anecdote.value))
    setTimeout(() => {this.context.store.dispatch(notificationChange(''))}, 5000) 
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

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteForm
