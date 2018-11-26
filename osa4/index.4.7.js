const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')


if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}
const url = process.env.MONGODB_URI

mongoose
  .connect(url, { useNewUrlParser: true })
  .then( () => {
    console.log('Connected to: ', url)
   })
   .catch(error => {
     console.log(error)
   })


app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.error)
app.use(middleware.logger)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server 1 running on port ${PORT}`)
})