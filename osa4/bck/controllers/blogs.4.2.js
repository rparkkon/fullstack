const blogsRouter = require('express').Router()
const mongoose = require('mongoose')

const Blog = mongoose.model('Blog', {
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  

blogsRouter.get('/', (request, response) => {
//    console.log('blogsRouter.get', request)    
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      .catch(err => {
        console.log('blogsRouter.get error:', err)    
      })
  })
  
blogsRouter.post('/', (request, response) => {
    console.log('blogsRouter.post', request.body)    
    const blog = new Blog(request.body)
    console.log('blogsRouter.post ', blog )    
      
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

  module.exports = blogsRouter