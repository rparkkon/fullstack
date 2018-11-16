import React from 'react'
import ReactDOM from 'react-dom'

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content} <strong>{note.important ? 'tärkeä' : ''}</strong>
    </li>
  )
}

const notes = [
  {
    id: 1,
    content: 'HTML on helppoa',
    date: '2017-12-10T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Selain pystyy suorittamaan vain javascriptiä',
    date: '2017-12-10T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
    date: '2017-12-10T19:20:14.298Z',
    important: true
  }
]

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: props.notes,
      newNote: 'uusi muistiinpano...'
    }
  }

  //const { notes } = props;
  //const rivit = () => notes.map(note => <li key={note.id}>{note.content}</li>)
  //const result = notes.map(note => note.content)
  //console.log(result)

  //const result = notes.map(note => note.content )
  //console.log(result)

  addNote = (event) => {
    event.preventDefault()
    console.log('nappia painettu')
    console.log(event.target)
    const noteObject = {
        content: this.state.newNote,
        date: new Date().toISOString(),
        important: Math.random() > 0.5,
        id: this.state.notes.length + 1
    }
    const notes = this.state.notes.concat(noteObject)
    this.setState({
      notes: notes,
      newNote: ''
    })
  }

  handleNoteChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNote: event.target.value })
  }


  render() {
    return (
      <div>
        <h1>Muistiinpanot</h1>
        <ul>
          {this.state.notes.map(note => <Note key={note.id} note={note} />)}
        </ul>
        <form onSubmit={this.addNote}>
          <input 
            value={this.state.newNote}
            onChange={this.handleNoteChange}
          />
          <button type="submit">tallenna</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(
  <App notes={notes} />,
  document.getElementById('root')
)