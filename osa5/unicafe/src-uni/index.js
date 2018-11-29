import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import counterReducer from './reducer'

const Otsikko = (props) =>  {
    return ( 
      <div>
          <h1>{props.nimi}</h1>
      </div>
    )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) =>  {
  //console.log('Palaute: ', store.getState())
  //console.log('Palaute good: ', store.getState().good)
  return ( 
    <div>

      <div>
      <table>
      <tbody>
      <tr>
        <th align="left">hyvä</th>
        <th align="left">{getStoreValue('GOOD')}</th>
      </tr>
       <tr>
        <th align="left">neutraali</th>
        <th align="left">{getStoreValue('OK')}</th> 
      </tr>
      <tr>
        <th align="left">huono</th>
        <th align="left">{getStoreValue('BAD')}</th> 
      </tr>
      <tr>
        <th align="left">keskiarvo</th>
        <th align="left">{props.mean}</th> 
      </tr>
      <tr>
        <th align="left">positiivisia</th>
        <th align="left">{props.positive} %</th> 
      </tr>
      </tbody>
    </table>
    </div>

    <div>
          <Button handleClick={asetaArvoon('ZERO')} text='nollaa tilasto' />
    </div>
    </div>
  )
}

const ShowStatistics = (props) =>  {
  if (props.total === 0)
    return (
      <div id = "statsno" >
        <p>Ei yhtään palautetta annettu</p>
      </div>
    )
    return (
      <div id = "stats" >
        <Statistics palaute={props.palaute} mean={props.mean} positive = {props.positive}/>        
      </div>  
    )
}

const store = createStore(counterReducer)


const getStoreValue = (category) => {
//  console.log('getValue: ', category, ' store: ',  store.getState())
  return store.getState()[category.toLowerCase()]
}
const getStoreValueTotal = () => {
  return  getStoreValue('BAD') + getStoreValue('OK') + getStoreValue('GOOD')
}

const asetaArvoon = (category) => {
  return () => {
    store.dispatch({type: category}) 
  }
}

class App extends React.Component { 
  constructor() {
    super()
    this.state = {
      counter: 0
    }
  }

  render() {
    const total = getStoreValueTotal()
    //console.log('total: ', total)

    const mean = total === 0 ? total : (((-1)* getStoreValue('BAD') + 0*getStoreValue('OK') + (1)* getStoreValue('GOOD')) / total).toFixed(1)
    const positive = total === 0 ? total : (100 *getStoreValue('GOOD') / total).toFixed(1);

    return (
      <div>
        <Otsikko nimi='Anna palautetta'/>
        <Button handleClick={asetaArvoon('GOOD')} text='hyvä' />
        <Button handleClick={asetaArvoon('OK')} text='neutraali' />
        <Button handleClick={asetaArvoon('BAD')} text='huono' />

        <Otsikko nimi='Statistiikka'/>

        <ShowStatistics total={total} palaute={this.palaute} mean={mean} positive = {positive}/>
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)