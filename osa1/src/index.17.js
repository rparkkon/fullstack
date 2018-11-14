import React from 'react';
import ReactDOM from 'react-dom';


const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

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
        <h1>anna palautetta</h1>
        <Button handleClick={this.asetaArvoon('hy')} text='hyvä' />
        <Button handleClick={this.asetaArvoon('ne')} text='neutraali' />
        <Button handleClick={this.asetaArvoon('hu')} text='huono' />

        <h1>statistiikka</h1>
        <div>   
          hyvä {this.palaute.hy}
          <br></br>
          neutraali {this.palaute.ne}
          <br></br>
          huono {this.palaute.hu}
          <br></br>
          keskiarvo {meanValue()}
          <br></br>
          positiivisia {positiveValue()} %
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)