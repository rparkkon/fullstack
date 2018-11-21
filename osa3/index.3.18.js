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
  
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
  /*
  const formattedPerson = {...person._doc, id: person._id}
  delete formattedPerson._id
  delete formattedPerson._v
  return formattedPerson
  */
}

// 
  app.get('/api/persons', (req, res) => {
    Person
      .find({})
      .then(persons => {
        res.json(persons.map(formatPerson))
      })
  })

  // 
  // 3.18
  app.get('/info', (req, res) => {
    const today = new Date();
    let info
    
    Person
      .countDocuments({}, function (err, count) {
      info = '<p>Puhelinluettelossa on '.concat(count).concat(' henkilön tiedot</p>').concat('<p>').concat(today).concat('</p>')
      res.send(info);
    });   
   
  })

  //
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log("app.get request.params.id: ", id)
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

  //
  app.delete('/api/persons/:id', (request, response) => {
    console.log("app.delete x request.params.id: ", request.params.id)
//    const id = Number(request.params.id)
//    persons = persons.filter(person => person.id !== id)
//    response.status(204).end()
      Person
      .findByIdAndRemove(request.params.id)
//      .findOneAndDelete(request.params.id)   poistaa ensimmäisen !?!?!?
      .then(person => {
        console.log("app.deleted: ", person.name, " ", person.id)
        response.status(204).end() //  json(formatPerson(person))
      })
      .catch(error => {
        console.log('app.delete:' , error)
        response.status(404).send({ error: 'malformatted id' }) // end()
      })
  })
  

  // korvaus
  app.put('/api/persons/:id', (request, response) => {
    const body = request.body
    console.log('app.put person x in body: ',body)

    const person = ({
      name: body.name,
      number: body.number
    })

    Person
    .findByIdAndUpdate(request.params.id,  person, { new: true })
    .then(updatedPerson => {
      response.json(formatPerson(updatedPerson))
    })
    .catch(error => {
      console.log('app.put:' , error)
      response.status(400).send({ error: 'malformatted id' })
    })

  })  


  // uusi nimi
  app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log('app.post person x in body: ',body)

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
    console.log(`Server G running on port ${PORT}  ${today}`)
  })

