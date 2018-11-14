import React from 'react';
import ReactDOM from 'react-dom';

const x = 1
let y = 5

console.log(x, y)  // tulostuu 1, 5
y += 10
console.log(x, y)  // tulostuu 1, 15
y = 'teksti'
console.log(x, y)  // tulostuu 1, teksti
//x = 4 


const t = [1, 2, 3, 4]

const m1 = t.map((luku) => luku * 2)
console.log(m1) // tulostuu [2, 4, 6, 8]

const m2 = t.map((luku) => '<li>' + luku + '</li>')
console.log(m2) 

const Kurssi = () =>  {
    return ( 
      
      <div>
          <h1>Half Stack -sovelluskehitys</h1>
      </div>
    )
}

const olio1 = {
  nimi: 'Arto Hellas',
  ika: 35,
  koulutus: 'Filosofian tohtori'
}

console.log(olio1.nimi)          // tulostuu Arto Hellas
const kentanNimi = 'ika'
console.log(olio1[kentanNimi])   // tulostuu 35

const summa = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}
const vastaus = summa(100,5)
console.log(vastaus)

const nelio = p => {
  console.log(p)
  return p * p
}

const snelio = p => p * p
console.log(snelio(50))

const tk = [1, 2, 3]
const tnelio = tk.map(p => p*p)
console.log(tnelio)


const App = () => {

  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14



  return (    
    <div>
      <Kurssi />
      <p>{osa1} {tehtavia1}</p>
      <p>{osa2} {tehtavia2}</p>
      <p>{osa3} {tehtavia3}</p>
      <p>yhteensä {tehtavia1 + tehtavia2 + tehtavia3} tehtävää</p>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)