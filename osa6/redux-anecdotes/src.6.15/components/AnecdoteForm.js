import React from 'react'
import { connect } from 'react-redux'
import {createNew} from '../reducers/anecdoteReducer'
import {notify} from '../reducers/notificationReducer'


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

    this.props.createNew(this.state.content)
    this.props.notify(this.state.content, 5)
    
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

export default connect(
  null,
   { createNew ,
    notify }
)(AnecdoteForm)