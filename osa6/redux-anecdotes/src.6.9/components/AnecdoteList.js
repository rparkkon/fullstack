import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {anecdoteVote} from '../reducers/anecdoteReducer'
import {notificationChange} from '../reducers/notificationReducer'
import {filterChange} from '../reducers/filterReducer'
import Filter from './Filter'


class AnecdoteList extends React.Component {
 /* 
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
*/

  render() {

    const anecdotesToShow = () => {
      console.log('anecdotesToShow: props ', this.props) 
      const { anecdotes, filter } = this.props
    //  const anecdotes =  store.getState().anecdotes
      if (filter === '' ) {
        return anecdotes
      }
    
    //  const filter = store.getState().filter
      console.log('FILTER: ', filter)
      return  anecdotes.filter((a) => a.content.indexOf(filter)>-1 ) // startsWith(filter))  
    }
    
    const anecdotes = anecdotesToShow() // this.context.store)

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
                this.props.anecdoteVote(anecdote.id)
                this.props.notificationChange(`Vote for: ${anecdote.content}`)
                setTimeout(() => { this.props.notificationChange('')}, 5000)
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

const mapStateToProps = (state) => {
  console.log('MAPStateToProps: state ', state) 
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  filterChange,
  anecdoteVote,
  notificationChange
}

/*
AnecdoteList.contextTypes = {
  store: PropTypes.object
}
export default AnecdoteList
*/

export default  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AnecdoteList)

/*
export default ConnectedAnecdoteList
*/