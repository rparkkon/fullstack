import React from 'react';
import noteService from './services/notes'

const Note = ({ note, toggleImportance }) => {
  return (
    <li onClick={toggleImportance}>
      {note.content} <strong>{note.important ? 'tärkeä' : ''}</strong>
    </li>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      newNote: '',
      showAll: true
    }
    console.log('constructor')
  }

  componentDidMount() {
    console.log('did mount')
    /*
    axios
      .get('http://192.168.224.153:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ notes: response.data })
      })
      */
      noteService
      .getAll()
      .then(response => {
        this.setState({notes: response})
      })
    }

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
    /*
    const notes = this.state.notes.concat(noteObject)
    this.setState({
      notes: notes,
      newNote: ''
    })
    */
   /*
   axios
    .post('http://192.168.224.153:3001/notes', noteObject)
    .then(response => {
      console.log(response)
      this.setState({
        notes: this.state.notes.concat(response.((data),
        newNote: ''
      })
    })
    */
    noteService
      .create(noteObject)
      .then(response => {
        this.setState({
          notes: this.state.notes.concat(response.data),
          newNote: ''
        })
      })
  }

  handleNoteChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNote: event.target.value })
  }

  toggleImportanceOf = (id) => {
    return () => {
      console.log('importance of '+id+' needs to be toggled')
      const note = this.state.notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }

      /*
      const url = `http://192.168.224.153:3001/notes/${id}`
      axios
      .put(url, changedNote)
      .then(response => {
        this.setState({
          notes: this.state.notes.map(note => note.id !== id ? note : response.data)
        })
      })  
      */

     noteService
      .update(id, changedNote)
      .then(response => {
       this.setState({
         notes: this.state.notes.map(note => note.id !== id ? note : response.data)
       })
      })
      .catch(Error => {
        console.log('error:' , Error)
        alert(`muistiinpano '${note.content}' on jo valitettavasti poistettu palvelimelta`)
       })
    }
  }

  render() {
    console.log('render')

    const notesToShow =
      this.state.showAll ?
        this.state.notes :
        this.state.notes.filter(note => note.important === true)

    return (
      <div>
        <h1>Muistiinpanot</h1>
        <ul>
          {notesToShow.map(note =>
            <Note
              key={note.id}
              note={note}
              toggleImportance={this.toggleImportanceOf(note.id)}
            />
          )}
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

export default App;
