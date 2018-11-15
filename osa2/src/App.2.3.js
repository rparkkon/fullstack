import React from 'react';

const Kurssi = (props) =>  {
  return ( 
    <div>
        <Otsikko nimi = {props.kurssi.nimi} />
    </div>
  )
}

const Otsikko = (props) =>  {
  return ( 
    <div>
        <h1>{props.nimi}</h1>
    </div>
  )
}

const Yhteensa = (props) =>  {

  const osat = props.kurssi.osat
  console.log("osat: ", osat) 

/*
  var total = 0 
  for (var i in osat) {total += osat[i].tehtavia}
  console.log("total: ", total)  
*/

  const total =  Object.keys(osat).reduce(function(sum, key) {return sum + osat[key].tehtavia}, 0)

  return ( 
    <div>
        <p>Yhteeensä {total}</p>
    </div>
  )
}


const Sisalto = (props) =>  {
  const kurssit = props.kurssi
  const result = kurssit.osat.map(osa => <p key={osa.id}>{osa.nimi} {osa.tehtavia}</p>)
  console.log(result)

  return ( 
    <div>
      <ul>
        {result}
      </ul>
    </div>
  )
}


const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Kurssi kurssi={kurssi} />
      <Sisalto kurssi={kurssi} />
      <Yhteensa kurssi={kurssi} />
    </div>
  )
}

export default App;
