import React from 'react';
import personService from './services/persons'

const Names = ({ persons, deleteHandler, filter = ''}) => {
  //console.log('Names: ', persons , ' ', filter )

  const filtered = filter === '' ?  persons : persons.filter(person => {return person.name.toLowerCase().startsWith(filter.toLowerCase()) })
  console.log('filtered: ',filtered )
  const namemap  = () => filtered.map(name => 
  <tr key={name.name}>
    <td>{name.name}</td>
    <td>{name.number}</td>
    <td><button onClick={deleteHandler} id={name.id}>Poista</button></td>
  </tr>)

  return (
    <div>
      <table><tbody>
      {namemap()}
      </tbody></table>
    </div>
  )
}

const Otsikko = (props) =>  {
    return ( 
      <div>
          <h1>{props.nimi}</h1>
      </div>
    )
}

// 2.9 suodatus
const Suodatus = (props) =>  {
  //console.log('Suodatus: ',  props.filter )
  return ( 
    <div>
    rajaa näytettävä: 
    <input 
        value={props.filter}
        onChange={props.filterChange}
        />
    </div>
  )
}

// 2.10 uuden henkilön lomake
const  UusiHenkilo = (props) =>  {
  //console.log('NewPerson: ' )
  return ( 
  <div>
    <form  onSubmit={props.handleAddEntry}>
    <div>
      nimi: 
      <input 
        value={props.newName}
        onChange={props.handleEntryChange}
      />
    </div>
    <div>
      numero: 
      <input 
        value={props.newNumber}
        onChange={props.handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
    </form>
  </div>
  )
}

//2.18 puhelinluettelo osa 11 parempi virhe
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      info: ''
    }
  }

// 2.11 data palvelimelta
componentDidMount() {
    console.log('persons did mount')

// 2.14 data palvelimelta,  2.15 moduulissa
personService
      .getAll()
      .then(response => {
        this.setState({persons: response})
      })
  }

  addEntry = (event) => {
    event.preventDefault()
    //console.log('addEntry: ', this.state.newName)
    //console.log(event.target)
    const entryObject = {
        name: this.state.newName ,
        // 2.8 puhelinnumero
        number: this.state.newNumber
    }

    // 2.7 ei tuplia
    const result = this.state.persons.find( person => person.name === entryObject.name );
    //console.log("TUPLA: ", result, 'persons: ', this.state.persons,  'entry: ', entryObject)
    if (result) {
      // 2.17 korvataan numero
      //const msg = result.name.concat(' [' , result.id, '] on jo luettelossa, korvataanko vanha numero uudella?')
      const msg = result.name.concat(' on jo luettelossa, korvataanko vanha numero uudella?')
      if (window.confirm(msg)) { 
        result.number = entryObject.number
        personService
        .update(result.id, result)
        .then(response => {
          //console.log(response)
          this.setState({
            persons: this.state.persons
          })
        })
        return
      }
    }
    if (result == null) {
      personService
        .create(entryObject)
        .then(person => {
          console.log('AddEntry: respnse: ', person)
          this.setState({
            persons: this.state.persons.concat(person),
            newName: '',
            newNumber: ''
          })
        })
    }    
  }

  handleEntryChange = (event) => {
    //console.log('handleEntryChange: ', event.target.value)
    this.setState({ newName: event.target.value })
  }

  // 2.8 puhelinnumero
  handleNumberChange = (event) => {
    //console.log('handleEntryChange: ', event.target)
    this.setState({ newNumber: event.target.value })
  }

  // 2.9 suodatus
  handleFilterChange = (event) => {
    //console.log('handleEntryChange: ', event.target)
    this.setState({ filter: event.target.value })
  }

  // 2.16 poista
  handleDelete = (event) => {
    console.log('handleDelete: [', event.target.id, ']')
    if (event.target.id) {
      const personToDelete = this.state.persons.find( person => String(person.id) === String(event.target.id))

      if (personToDelete) {
        //if (window.confirm('Poistetaanko '.concat(personToDelete.name).concat(' [' , event.target.id, ']?'))) { 
        if (window.confirm('Poistetaanko '.concat(personToDelete.name).concat('?'))) { 
          personService
            .deletePerson(personToDelete.id)
            .then(response => {
              console.log(response)
              const persons = this.state.persons.filter(n => n.id !== personToDelete.id)
              this.setState({
                persons: persons
              })
            })
        }
      }
    }
    //this.setState({ filter: event.target.value })
  }


  render() {
    return (
      <div>
        <Otsikko nimi='Puhelinluettelo' />

        <Notification message = {this.state.info} />

        <Suodatus filter={this.state.filter} filterChange={this.handleFilterChange} />

        <Otsikko nimi='Lisää uusi' />

        <UusiHenkilo handleAddEntry={this.addEntry}
                     newName={this.state.newName}
                     handleEntryChange={this.handleEntryChange}
                     newNumber={this.state.newNumber}
                     handleNumberChange={this.handleNumberChange}
                     />

        <Otsikko nimi='Numerot' />

        <Names persons={this.state.persons} filter={this.state.filter} deleteHandler={this.handleDelete}/>

      </div>
    )
  }
}

export default App;
