import React from 'react';


class App extends React.Component {
  // jos konstruktorille ei ole tarvetta, voidaan tilan alkuarvo määritellä näin
  state = {
    newAnecdote: ''
  }

  voteAnecdote = (id) => () => {
    console.log('voteAnecdote: ', id)
    this.props.store.dispatch({
        type: 'VOTE',
        data: { id }
    })
    }    

    onChange = (event) => {
      console.log('s')
      this.setState({
        newAnecdote: event.target.value
      })
    } 
  
    newAnecdote = (event) => () => {
      event.preventDefault()        
      console.log('newAnecdote event: ', event)
        try{
            this.props.store.dispatch({
                type: 'NEW',
                data: { 
                    content: this.state.newAnecdote,
                    votes: 0
                }
            })
        } catch (error) {
            console.log(error)
        }
    }    
    

  render() {

    const anecdotes = this.props.store.getState().sort((a,b) => b.votes - a.votes) 

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteAnecdote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <div>
            <form onSubmit={this.newAnecdote()}>
            <input name="anecdote"
                  value={this.state.newAnecdote}
                  onChange={this.onChange}
             />
            <button type="submit">create</button>
            </form>
        </div> 
      </div>
    )
  }
}

export default App