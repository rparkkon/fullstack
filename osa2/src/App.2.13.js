import React from 'react';
import axios from 'axios'



const Names = ({ countries, countryClick, filter = ''}) => {

  const filtered = filter === '' ?  countries : countries.filter(country => {return country.name.toLowerCase().includes(filter.toLowerCase()) })

  const n =  Object.keys(filtered).reduce(function(sum, key) {return sum + 1}, 0)
//  console.log('match: ', n)
        
  let namemap
  let label 

  if (n === 0) {
    label = 'no match'
  }
  else if (n > 10) {
    label = ('too many matches, specify another filter') // [').concat(n).concat(']')
  }
  else {
//    console.log('countryClick: ', countryClick)
    namemap = filtered.map(country => 
      <tr key={country.name}>
        <td><div onClick={countryClick} id={country.name}>{country.name}</div></td>
      </tr>)
  }

  if (n === 1)  {
//    console.log("filtered",  filtered)
    return (
      <div>
      <h1>{filtered.map(country => country.name)} {filtered.map(country => country.nativeName)}</h1>
      <p>capital: {filtered.map(country => country.capital)}</p> 
      <p>population: {filtered.map(country => country.population)}</p> 
      <img src={filtered.map(country => country.flag)} width="200" alt="flag"/>
      </div>
   )
  }
  
  return (
    <div>
     <p>{label}</p>
      <table><tbody>
      {namemap}
      </tbody></table>
    </div>
  )
}

const Suodatus = (props) =>  {
  //console.log('Suodatus: ',  props.filter )
  return ( 
    <div>
    find countries: 
    <input 
        value={props.filter}
        onChange={props.filterChange}
        />
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
    //console.log('constructor')
  }

  componentDidMount() {
    //console.log('did mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
  }
 
  handleFilterChange = (event) => {
    //console.log('handleEntryChange: ', event.target)
    this.setState({ filter: event.target.value })
  }

  handleCountryClick = (event) => {
    //console.log('handleCountryClick: ', event.target.id)
    this.setState({ filter: event.target.id })
  }

  render() {
 
    return (
      <div>

        <Suodatus filter={this.state.filter} filterChange={this.handleFilterChange}/>

        <Names countries={this.state.countries} filter={this.state.filter}  countryClick={this.handleCountryClick}/>

      </div>
    )
  }
}

export default App;
