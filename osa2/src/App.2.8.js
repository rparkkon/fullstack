import React from 'react';

const Names = ({ persons}) => {
  const namemap  = () => persons.map(name => <tr key={name.name}><td>{name.name}</td><td>{name.number}</td></tr>)
//  console.log('Names: ', persons , ' ', namemap )
  return (
    <div>
      <table><tbody>
      {namemap()}
      </tbody></table>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: ''
    }
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

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form  onSubmit={this.addEntry}>
          <div>
            nimi: 
            <input 
              value={this.state.newName}
              onChange={this.handleEntryChange}
            />
          </div>
          <div>
            numero: 
            <input 
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
      
        <h2>Numerot</h2>
        <ul>
        <Names persons={this.state.persons} />
        </ul>
      </div>
    )
  }
}

export default App;
