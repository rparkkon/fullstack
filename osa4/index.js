const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')

mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true })  // ???
  .then( () => {
    console.log('Connected to: ', config.mongoUrl)
   })
   .catch(error => {
     console.log(error)
   })


app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.error)
app.use(middleware.logger)
//app.use(middleware.tokenExtractor)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server 1 running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}