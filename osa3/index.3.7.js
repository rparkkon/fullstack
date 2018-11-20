const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(morgan('tiny'))
morgan.token('type', function (req, res) { return req.headers['content-type'] })

app.use(bodyParser.json())


let persons = [
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
  ]


//  3.1 puhelinluettelon backend osa 1
  app.get('/api/persons', (req, res) => {
    res.json(persons)
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
//    console.log("request.params.id: ", id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        console.log("request.params.id: ", id, " not found")
        response.status(404).end()
    }
//    console.log(person)
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
//    console.log('person in body: ',body)

    // 3.6 nimi / numero tulee olla
    if (body.name === undefined || body.name.length === 0 ) {
      return response.status(400).json({error: 'name missing'})
    }
    if (body.number === undefined || body.number.length === 0)  {
      return response.status(400).json({error: body.name.concat(': number missing')})
    }
  
    const newPerson = {
        name: body.name,
        number: body.number,
        id:  getRandomInt(3000000)
      }

    // 3.6 ei tuplia
    const person = persons.find(person => person.name === newPerson.name)
    if (person) {
  //      console.log("request.params.id: ", person.name, " already exists")
        return response.status(205).json({error: person.name.concat(': name must be unique')})
    } 
  
//    console.log('new person in:',newPerson)
    persons = persons.concat(newPerson)
    response.json(newPerson)
  })


  const PORT = 3001
  app.listen(PORT, () => {
    const today = new Date();
    console.log(`Server running on port ${PORT}  ${today}`)
  })

