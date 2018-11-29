import React from 'react';


class App extends React.Component {

  voteAnecdote = (id) => () => {
    console.log('voteAnecdote: ', id)
    this.props.store.dispatch({
        type: 'VOTE',
        data: { id }
    })
    }    

    newAnecdote = (event) => () => {
        console.log('newAnecdote event: ', event)
        //event.preventDefault()        
        console.log('newAnecdote: ')
        const content = '??' // event.target.anecdote.value
        try{
            this.props.store.dispatch({
                type: 'NEW',
                data: { 
                    content: content,
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
            <input name="anecdote" />
            <button type="submit">create</button>
            </form>
        </div> 
      </div>
    )
  }
}

export default App