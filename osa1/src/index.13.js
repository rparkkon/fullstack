import React from 'react';
import ReactDOM from 'react-dom';


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

const Sisalto = (props) =>  {
  return ( 
    <div>
      <Osa osa={props.osa.nimi} tehtavia={props.osa.tehtavia} />
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
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  }

  return (
    <div>
      <Otsikko nimi={kurssi}/>
      <Sisalto osa={osa1}/>
      <Sisalto osa={osa2}/>
      <Sisalto osa={osa3}/>
      <Yhteensa lukumaara={osa1.tehtavia + osa2.tehtavia + osa3.tehtavia} /> 
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)