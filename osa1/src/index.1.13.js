import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0
    }
    this.votes = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      }
    }

  valitseArvo = () => {
    return () => {
      this.setState({selected: Math.floor(Math.random() * this.props.anecdotes.length )})
      console.log('random: ', this.state.selected )
    }
  }

  voteAnecdote = () => {
    return () => {
      console.log('vote to: ', this.state.selected )
    }
  }


  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}

      <div>
        <br></br>
        <Button handleClick={this.voteAnecdote()} text='vote' />
        <Button handleClick={this.valitseArvo()} text='next anecdote' />
      </div>

      </div>

    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)