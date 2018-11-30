import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {anecdoteVote} from '../reducers/anecdoteReducer'
import {notificationChange} from '../reducers/notificationReducer'
import Filter from './Filter'

/*
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}
*/


const anecdotesToShow = (store) => {
  //const { anecdotes, filter } = this.props
  const anecdotes =  store.getState().anecdotes
  if (filter === '') {
    return anecdotes
  }

  const filter = store.getState().filter
  //console.log('Filter: ', filter)
  return  anecdotes.filter((a) => a.content.indexOf(filter)>-1 ) // startsWith(filter))  
}

class AnecdoteList extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {

    const anecdotes = anecdotesToShow(this.context.store)

    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />

      <div>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.context.store.dispatch(anecdoteVote(anecdote.id))
                this.context.store.dispatch(notificationChange(`Vote for: ${anecdote.content}`))
                setTimeout(() => {this.context.store.dispatch(notificationChange(''))}, 5000)
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


AnecdoteList.contextTypes = {
  store: PropTypes.object
}
export default AnecdoteList

/*
const ConnectedAnecdoteList = connect(
    mapStateToProps
  )(AnecdoteList)

export default ConnectedAnecdoteList
*/