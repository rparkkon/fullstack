import React from 'react'
import { connect } from 'react-redux'
import {anecdoteInsert} from '../reducers/anecdoteReducer'
import {notificationChange} from '../reducers/notificationReducer'
import service from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
  }

  handleChange = (e) => {
    //console.log("ANE HANDLE:", e.target.value)
    this.setState({content: e.target.value})
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const newAnecdote = await service.createNew(this.state.content)

    this.props.anecdoteInsert(newAnecdote) // e.target.anecdote.value))
    this.props.notificationChange(newAnecdote.content)
    setTimeout(() => {this.props.notificationChange('')}, 5000) 
    //e.target.anecdote.value = ''
  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' onChange={this.handleChange}/></div>
          <button>create</button> 
        </form>
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
  anecdoteInsert,
  notificationChange
}

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)
