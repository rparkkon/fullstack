import React from 'react';

const Kurssit = ({ kurssit }) => {
  //console.log('kurssi:', kurssit)
  var osa =  kurssit.osat;

  /*
  console.log('osa:', osa);
  var tehtavia = 0;
  Object.keys(osa).forEach(function(key) {
      console.log('osa:', osa[key].nimi);
      tehtavia += osa[key].tehtavia;
  })
  */

  const nimimap  = () => osa.map(osa => <p key={osa.id}>{osa.nimi} {osa.tehtavia}</p>)
  //console.log('nimimap:', nimimap());
  //console.log('tehtavia:', tehtavia);

  const sum =  Object.keys(osa).reduce(function(sum, key) {return sum + osa[key].tehtavia}, 0)
  //console.log('reduce total:', sum) 

return (
    <div>
      <Otsikko nimi={kurssit.nimi} />
      {nimimap()}
      <Yhteensa summa={sum} />
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
  return ( 
    <div>
        <p>Yhteeensä {props.summa} tehtävää</p>
    </div>
  )
}

const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
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
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

/*
const nimet = () => kurssit.map(kurssit => <li key={kurssit.id}>{kurssit.nimi}</li>)
console.log('nimet: ', nimet);
const osat = () => kurssit.map(kurssit => <li key={kurssit.osat[0].id}>{kurssit.osat[0].nimi}</li>)
console.log('osat: ', osat);


Object.keys(kurssit).forEach(function(key) { 
  console.log('kurssit[key]', kurssit[key]);
  var osa =  kurssit[key].osat;
  Object.keys(osa).forEach(function(key) { 
    console.log('osa:', osa[key].nimi);
  })
});
*/

  return (
    <div>
      <h1>Opetusohjelma</h1>
      {kurssit.map(kurssit => <Kurssit key={kurssit.id} kurssit = {kurssit} />)}
    </div>
  )
}

export default App;
