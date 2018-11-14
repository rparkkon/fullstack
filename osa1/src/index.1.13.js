import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Otsikko = (props) =>  {
  return ( 
    <div>
        <h1>{props.nimi}</h1>
    </div>
  )
}

function mostVotes(votes, len = 6){
  var i, j;
  var most = 0;
  if (votes) {
    console.log('this.votes.length: ', len , ' ' , votes) // votes.length )
    for (i= 0; i < len; i++) {
        if ( votes[i] > most ) {
          most = votes[i]
          j = i
        }
    }
  }
  return j
}

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
    }
  }

  voteAnecdote = () => {
    return () => {
      this.votes[this.state.selected] = this.votes[this.state.selected]  + 1       
      //console.log('vote to: ', this.state.selected, ' votes: ', this.votes[this.state.selected] )
    }
  }


  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <p>has {this.votes[this.state.selected]} votes</p>  
      <div>
        <br></br>
        <Button handleClick={this.voteAnecdote()} text='vote' />
        <Button handleClick={this.valitseArvo()} text='next anecdote' />
      </div>

      <Otsikko nimi = 'anecdote with most votes' />
      {this.props.anecdotes[mostVotes(this.votes)]}
      <p>has {this.votes[mostVotes(this.votes)]} votes</p>  
      
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