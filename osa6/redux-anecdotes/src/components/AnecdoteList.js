import React from 'react'
import {anecdoteVote} from '../reducers/anecdoteReducer'
import {notificationChange} from '../reducers/notificationReducer'
import Filter from './Filter'

class AnecdoteList extends React.Component {

  render() {

    let anecdotes = this.props.store.getState().anecdote
    const filter = this.props.store.getState().filter
    if (filter !== '') {
      console.log('Filter: ', filter)
      anecdotes = anecdotes.filter((a) => a.content.indexOf(filter)>-1 ) // startsWith(filter))  
    }

    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter  store={this.props.store}/>

      <div>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.props.store.dispatch(anecdoteVote(anecdote.id))
                this.props.store.dispatch(notificationChange(`Vote for: ${anecdote.content}`))
                setTimeout(() => {this.props.store.dispatch(notificationChange(''))}, 5000)
              }
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>

      </div>
    )
  }
}

export default AnecdoteList
