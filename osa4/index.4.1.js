const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = Blog

app.use(cors())
app.use(bodyParser.json())

//const mongoUrl = 'mongodb://localhost/bloglist'
//mongoose.connect(mongoUrl)

if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
  }
const url = process.env.MONGODB_URI
//console.log('mongoose url:', url)

mongoose.connect(url, { useNewUrlParser: true })


app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})