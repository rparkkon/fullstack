import React from 'react';
import ReactDOM from 'react-dom';

const kurssi = 'Half Stack -sovelluskehitys'
const osa1 = 'Reactin perusteet'
const tehtavia1 = 10
const osa2 = 'Tiedonvälitys propseilla'
const tehtavia2 = 7
const osa3 = 'Komponenttien tila'
const tehtavia3 = 14

const Otsikko = (props) =>  {
    return ( 
      <div>
          <h1>{props.nimi}</h1>
      </div>
    )
}

const Sisalto = () =>  {
  return ( 
    <div>
      <p>{osa1} {tehtavia1}</p>
      <p>{osa2} {tehtavia2}</p>
      <p>{osa3} {tehtavia3}</p>
    </div>
  )
}

const Yhteensa = (props) =>  {
  return ( 
    <div>
      <p>Yhteensä {props.lukumaara} tehtävää</p>
    </div>
  )
}

const App = () => {

  return (
    <div>
      <Otsikko nimi={kurssi}/>
      <Sisalto />
      <Yhteensa lukumaara={tehtavia1 + tehtavia2 + tehtavia3} /> 
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)