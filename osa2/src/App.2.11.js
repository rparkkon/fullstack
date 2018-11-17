import React from 'react';
import axios from 'axios'

const Names = ({ persons, filter = ''}) => {
  //console.log('Names: ', persons , ' ', filter )

  const filtered = filter === '' ?  persons : persons.filter(name => {return name.name.toLowerCase().startsWith(filter.toLowerCase()) })
  const namemap  = () => filtered.map(name => <tr key={name.name}><td>{name.name}</td><td>{name.number}</td></tr>)

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

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

// 2.11 data palvelimelta
componentDidMount() {
    //console.log('did mount')
    axios
      .get('http://192.168.224.153:3001/persons')
      .then(response => {
        //console.log('promise fulfilled')
        this.setState({ persons: response.data })
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
    if (result == null) {
      const persons = this.state.persons.concat(entryObject)
      this.setState({
        persons: persons,
        newName: '',
        newNumber: ''
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

  render() {
    return (
      <div>
        <Otsikko nimi='Puhelinluettelo' />

        <Suodatus filter={this.state.filter} filterChange={this.handleFilterChange} />

        <Otsikko nimi='Lisää uusi' />

        <UusiHenkilo handleAddEntry={this.addEntry}
                     newName={this.state.newName}
                     handleEntryChange={this.handleEntryChange}
                     newNumber={this.state.newNumber}
                     handleNumberChange={this.handleNumberChange}
                     />

        <Otsikko nimi='Numerot' />

        <Names persons={this.state.persons} filter={this.state.filter} />

      </div>
    )
  }
}

export default App;
