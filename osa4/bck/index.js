const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
/*
if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}
console.log("process.env.NODE_ENV:", process.env.NODE_ENV )
const url = process.env.MONGODB_URI
*/
mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true })
  .then( () => {
    console.log('Connected to: ', config.mongoUrl)
   })
   .catch(error => {
     console.log(error)
   })


app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.error)
app.use(middleware.logger)

const server = http.createServer(app)

const PORT = 3003
server.listen(config.port, () => {
  console.log(`Server 1 running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}