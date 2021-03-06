import React from 'react'
import { connect } from 'react-redux'
import {anecdoteVoted} from '../reducers/anecdoteReducer'
import {notificationChange} from '../reducers/notificationReducer'
import {filterChange} from '../reducers/filterReducer'
import Filter from './Filter'
import service from '../services/anecdotes'


class AnecdoteList extends React.Component {

  saveVoted = async (anecdote) => {
    console.log('to VOTE: ', anecdote)  
    const newAnecdote = await service.updateVote(anecdote)
    return newAnecdote
  }  
  
  render() {

    const anecdotesToShow = () => {
      //console.log('anecdotesToShow: props ', this.props) 
      const { anecdotes, filter } = this.props
      if (filter === '' ) {
        return anecdotes
      }
    
      console.log('FILTER: ', filter)
      return  anecdotes.filter((a) => a.content.indexOf(filter)>-1 ) // startsWith(filter))  
    }
    
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
                this.props.anecdoteVoted(anecdote)
                this.saveVoted(anecdote)
                this.props.notificationChange(`Vote for: ${anecdote.content}`)
                setTimeout(() => { this.props.notificationChange('')}, 5000)
              }
              }>
                vote
              </button>
              id {anecdote.id}
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
  anecdoteVoted,
  notificationChange
}

export default  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AnecdoteList)