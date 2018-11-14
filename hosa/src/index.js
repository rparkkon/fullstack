import React from 'react';
import ReactDOM from 'react-dom';

const Display = (props) =>
{
  const counter = props.counter
  console.log('display: ', props, ' c:', counter); 
  return (<div>{counter}</div>)
}
//const Display = ({counter}) => {console.log('display: ', counter); return (<div>{counter}</div>)}
//const Display = ({counter}) => <div>{counter}</div>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

class App extends React.Component { 
  constructor() {
    super()
    this.state = {
      counter: 1,
      vasen : 0,
      oikea : 0,
      kaikki: [],
      value: 0
    }
    /*
    setInterval(() => {
      this.setState({counter: this.state.counter + 1})
    }, 1000)
    */
  }

 /* 
asetaArvoon = (arvo) => {
  console.log('clicked', arvo)
  return () => {
    this.setState({counter: arvo})
  }
}
*/
asetaArvoon = (arvo) => () => { this.setState({counter: arvo}) }

klikVasen = (arvo) => () => {
   this.setState({
     vasen: this.state.vasen + 1,
     kaikki:this.state.kaikki.concat('v')
   })
  } 
klikOikea = (arvo) => () => { this.setState({counter: arvo}) }
miinus = () => {this.setState({counter: this.state.counter - 1})}
//  miinus() {this.setState({counter: this.state.counter - 1})}

handler = () => {
  console.log('Nappia painettu')
  this.setState({counter: 0})
}

  render() {
    console.log('renderöidään', this.state.vasen)
    console.log('renderöidään kaikki', this.state.kaikki)
    const historia = () => {
      if (this.state.kaikki.length === 0) {
        return(<div><em>paina nappeja</em></div>)
      }
      return (<div>hstory: {this.state.kaikki.join(':')}</div>)

    }

    const hello = (who) => {
      return () => {console.log('Hello ', who)}
    }

    const setToValue = (vavo) => {
      return () => {this.setState({value: vavo})}
    }

    return (
      <div>
      <Display props={this.state} counter={this.state.counter}/>
      <button onClick={
          this.asetaArvoon(this.state.counter + 1)
      }>
      plus
     </button>
     <Button 
       handleClick={this.asetaArvoon( 0 )}
       text='Zero'
       />
     <button onClick={ this.asetaArvoon(this.state.counter - 1)} >
     minus
     </button>
     <button onClick={this.miinus} >
     miinus
     </button>
     <br></br>
     <button onClick={this.klikVasen((this.state.vasen))} >
     vasen
     </button>
     <br></br>
     <br></br>
     <button onClick={this.handler} >
     paina
     </button>

     <br></br>
     <br></br>
     <button onClick={hello('Matti')} >
     hello
     </button>

     <br></br>
     <br></br>
     <br></br>
     <button onClick={setToValue(500)} >
     500
     </button>
     <button onClick={setToValue(600)} >
     600
     </button>
     <br></br>


     <div>{historia()}</div>
     </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)