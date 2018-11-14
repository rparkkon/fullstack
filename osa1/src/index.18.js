import React from 'react';
import ReactDOM from 'react-dom';


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
  //console.log('Palaute: ', props)
  return ( 
    <div>
      hyvä {props.palaute.hy}
      <br></br>
      neutraali {props.palaute.ne}
      <br></br>
      huono {props.palaute.hu}
    </div>
  )
}

const Statistic = (props) =>  {
  return ( 
    <div>
      {props.nimi} {props.lukumaara}  {props.postfix}
    </div>
  )
}

class App extends React.Component { 
  constructor() {
    super()
    this.state = {
      counter: 0
    }
    this.palaute = {
      hy: 0,
      ne: 0,
      hu: 0
    }
  }

  asetaArvoon = (category) => {
    return () => {
      this.palaute[category] = this.palaute[category] + 1    
      this.setState({counter: this.state.counter + 1})
    }
  }

  render() {

  const meanValue = () => { 
    //console.log('values ', this.state.counter)
    if (this.state.counter > 0) {
        return (((-1)*this.palaute.hu + 0*this.palaute.ne + (1)*this.palaute.hy) / this.state.counter).toFixed(1)
    }
    else
      return 0
  }
  
  const positiveValue = () => { 
  //console.log('values ', this.state.counter)
  if (this.state.counter > 0) {
      return  (100 * this.palaute.hy / this.state.counter).toFixed(1);
    }
    else
      return 0
  }

    return (
      <div>
        <Otsikko nimi='anna palautetta'/>
        <Button handleClick={this.asetaArvoon('hy')} text='hyvä' />
        <Button handleClick={this.asetaArvoon('ne')} text='neutraali' />
        <Button handleClick={this.asetaArvoon('hu')} text='huono' />

        <Otsikko nimi='statistiikka'/>
        <Statistics palaute={this.palaute} />        
        <Statistic nimi='keskiarvo' lukumaara={meanValue()}/>
        <Statistic nimi='positiivisia' lukumaara={positiveValue()}  postfix='%'/> 
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)