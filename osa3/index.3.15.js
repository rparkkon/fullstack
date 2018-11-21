const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))

morgan(':method :url :status :res[content-length] - :response-time ms')
morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '->',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})
app.use(morgan('common'))
app.use(bodyParser.json())


const formatPerson = (person) => {
  /*
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
  */
  const formattedPerson = {...person._doc, id: person._id}
  delete formattedPerson._id
  delete formattedPerson._v
  return formattedPerson
}

let persons = [
  /*
        {
          "name": "Arto Hellas",
          "number": "040-123456",
          "id": 1
        },
        {
          "name": "Martti Tienari",
          "number": "040-123456",
          "id": 2
        },
        {
          "name": "Arto Järvinen",
          "number": "040-123456",
          "id": 3
        },
        {
          "name": "Lea Kutvonen",
          "number": "040-123456",
          "id": 4
        }
        */
  ]

//  3.1 puhelinluettelon backend osa 1
  app.get('/api/persons', (req, res) => {
    Person
      .find({})
      .then(persons => {
        res.json(persons.map(formatPerson))
      })
  })

  // 3.2 puhelinluettelon backend osa 2
  app.get('/info', (req, res) => {
    const today = new Date();
//    console.log('persons count: ',persons.length)
    const info = '<p>Puhelinluettelossa on '.concat(persons.length).concat(' henkilön tiedot</p>').concat('<p>').concat(today).concat('</p>')
    res.send(info);
  })

  //3.3 puhelinluettelon backend osa 3  
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log("request.params.id: ", id)
    /*
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        console.log("request.params.id: ", id, " not found")
        response.status(404).end()
    }
    */
    Person
      .findById(request.params.id)
      .then(person => {
        response.json(formatPerson(person))
      })
      .catch(error => {
        console.log('app.get:' , error)
        response.status(404).end()
      })
  })

  //3.4 puhelinluettelon backend osa 4
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })
  
  // 3.5 puhelinluettelon backend osa 5
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log('person in body: ',body)

    // 3.6 nimi / numero tulee olla
    if (body.name === undefined || body.name.length === 0 ) {
      return response.status(400).json({error: 'name missing'})
    }
    if (body.number === undefined || body.number.length === 0)  {
      return response.status(400).json({error: body.name.concat(': number missing')})
    }
  
    const person = new Person ({
        name: body.name,
        number: body.number
      })

    // 3.6 ei tuplia
    /*
    const person = persons.find(person => person.name === newPerson.name)
    if (person) {
        console.log("request.params.id: ", person.name, " already exists")
        return response.status(205).json({error: person.name.concat(': name must be unique')})
    } 
    */
  
    console.log('new person in:', person)
//    persons = persons.concat(person)

    person
      .save()
      .then(savedPerson => {
        response.json(formatPerson(savedPerson))
      })
      .catch(error => {
        console.log('app.post err:', error)
      })

  })


  const PORT =  process.env.PORT || 3001
  app.listen(PORT, () => {
    const today = new Date();
    console.log(`Server B running on port ${PORT}  ${today}`)
  })

