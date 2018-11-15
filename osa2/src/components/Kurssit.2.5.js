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

export default Kurssit