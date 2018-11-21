const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
  }
const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true })

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

let nimi
let numero
let n

process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
    if (index === 2) {
        nimi = val
    }
    if (index === 3) {
        numero = val
    }
    n = index
  });

  console.log(`index: ${n}`);
  if (n > 1) {
    const person = new Person({
    name: nimi,
    number: numero
    })

    console.log(`Person: ${person}`);
    //mongoose.connection.close()

    person
    .save()
    .then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}
else {
    console.log(`Puheliluettelo:`);

    Person
    .find({})
    .then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        })
        mongoose.connection.close()
    })
}