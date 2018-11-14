import React from 'react';
import ReactDOM from 'react-dom';

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


  render() {

    const incCount = (category) => () => { 
      // console.log({category}, ' ', this.palaute[category])
       this.palaute[category] =  this.palaute[category] + 1; 
       this.setState({value: this.state.value+1});
     }
     
    return (
      <div>
        <h1>anna palautetta</h1>
        <button onClick={incCount('hy')}>hyvä</button>
        <button onClick={incCount('ne')}>neutraali</button>
        <button onClick={incCount('hu')}>huono</button>

        <h1>statistiikka</h1>
        <div>
          hyvä {this.palaute.hy}
          <br></br>
          neutraali {this.palaute.ne}
          <br></br>
          huono {this.palaute.hu}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)