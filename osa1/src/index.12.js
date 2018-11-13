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

const Osa = (props) =>  {
  return ( 
    <div>
      <p>{props.osa} {props.tehtavia}</p>
    </div>
  )
}

const Sisalto = () =>  {
  return ( 
    <div>
      <Osa osa={osa1} tehtavia={tehtavia1} />
      <Osa osa={osa2} tehtavia={tehtavia2} />
      <Osa osa={osa3} tehtavia={tehtavia3} />
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