import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {anecdoteCreate} from '../reducers/anecdoteReducer'
import {notificationChange} from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
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

  handleSubmit = (e) => {
    e.preventDefault()
    //const content = e.target.anecdote.value
    //const toDispatch = anecdoteCreate(content);
    //console.log('toDispatch: ', toDispatch)

    this.props.anecdoteCreate(e.target.anecdote.value)
    this.props.notificationChange(e.target.anecdote.value)
    setTimeout(() => {this.props.notificationChange('')}, 5000) 
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

/*
AnecdoteForm.contextTypes = {
  store: PropTypes.object
}
export default AnecdoteForm
*/

const mapStateToProps = (state) => {
  console.log('MAPStateToProps: state ', state) 
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  anecdoteCreate,
  notificationChange
}

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)
