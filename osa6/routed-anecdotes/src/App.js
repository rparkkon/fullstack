import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect
} from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Table, FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap'
import { Container, Menu } from 'semantic-ui-react'


import image from "./img/IMG_1265t.JPG"
class Picture extends React.Component{
  render(){
    return(
      <img src={image}/>
   );
  }
}

const Menu1 = () => (
  <div style={{
    border: 'none',
    padding: 10,
    borderWidth: 5,
    backgroundColor: 'rgba(255, 255, 128, .5)',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    }}>

  <Menu inverted>
    <Menu.Item link>
      <Link to="/anecdotes">anecdotes</Link>
    </Menu.Item>
    <Menu.Item link>
      <Link to="/create">create new</Link>
    </Menu.Item>
    <Menu.Item link>
      <Link to="/about">about</Link>
    </Menu.Item>
  </Menu>

  </div>
)

const Menu0 = () => (
  <div style={{
    border: 'none',
    padding: 10,
    borderWidth: 5,
    backgroundColor: 'rgba(255, 255, 128, .5)',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    }}>

    <NavLink to="/anecdotes" isActive={oddEvent} 
    style={{ background: "cyan", ":hover": { background: "green" } }}
    activeStyle={{fontWeight: "bold", color: "red"}}
    >anecdotes</NavLink> &nbsp;
    <NavLink to="/create" activeStyle={{fontWeight: "bold", color: "red"}}>create new</NavLink>  &nbsp;
    <NavLink to="/about" activeStyle={{fontWeight: "bold", color: "red"}}>about</NavLink>
  </div>
)


const Notification = ({ notification }) => {
    if (notification === '') {
      return null
    }
    return (
    <div style={{
      border: 'double',
      padding: 10,
      borderWidth: 5,
      backgroundColor: 'Cyan',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
     }}>
      {notification}
    </div>
    )
  }


const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>    
      <tbody>

        {anecdotes.map(anecdote => <tr key={anecdote.id} >
          <td><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></td>
          <td>{anecdote.author}</td>
          </tr>)}

      </tbody>
    </Table>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for mor info see <a href={anecdote.info}>{anecdote.info}</a> </p>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    
    <Table>
    <tbody>
    <td>
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </td>
    <td>
     <Picture/>
    </td>
    </tbody>
    </Table>
  </div>
)

const Footer = () => (
  <div>
    <br></br>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

// only consider an event active if its event id is an odd number
const oddEvent = (match, location) => {
  console.log('oddEvent:', match)  
  if (!match) {
    return false
  }
  const eventID = parseInt(match.params.eventID)
  return !isNaN(eventID) && eventID % 2 === 1
}


class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

   // console.log('add new:', this.props.addNew)

    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/') // anecdotes')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <div>
          <ControlLabel>content</ControlLabel> 
            <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
          <ControlLabel> author</ControlLabel> 
            <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
          <ControlLabel>url for more info</ControlLabel> 
            <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <br></br>
          <Button bsStyle="success" type="submit">create</Button>
        </FormGroup>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ 
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: anecdote.content
     })
    setTimeout(() => {
      this.setState({ notification: ''})
    }, 5000)    
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

//  <Notification notification={this.state.notification}/>

  render() {

    return (
      <div  className="container">
        <h1>Software anecdotes</h1>
        <Router>
          <div>
            
            <Menu0/>
        
            {(this.state.notification &&
              <Alert color="success">
                {this.state.notification}
              </Alert>
            )}

            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />

            <Route path="/create" render={({history}) =>
               <CreateNew history={history} addNew={this.addNew} /> } 
            />

            <Route path="/about" render={() => <About />} />
            <Route exact path="/anecdotes/:id" render={({match}) => <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
          </div>
        </Router>
        <Footer />
    </div>
    );
  }
}

export default App;
