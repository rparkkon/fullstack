const blogsRouter = require('express').Router()
const mongoose = require('mongoose')
const util = require('util')
const Blog  = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const bolgOk = (blog) => {
  let ret = ''
  if (blog.title === undefined || blog.title === null ||  blog.title.length === 0) {
    ret = 'title is missing'
  }
  if (blog.url === undefined || blog.url === null ||  blog.url.length === 0) {
    ret = 'url is missing' 
  }
  return ret
}

// get all
blogsRouter.get('/', async (request, response) => {
  //    console.log('blogsRouter.get: ', request.route)    
    try {
      const blogs = await Blog.find({})
//      console.log('blogsRouter.get async: ', blogs)    
      response.json(blogs)
    } catch (exception) {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
 })

 // update one
 blogsRouter.put('/:id', async (request, response) => {
//    console.log('blogsRouter.put: ', request.params.id, ' body: ', request.body)  
    const body = request.body
    const blogUpdated = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
    })

    const nok = bolgOk(blogUpdated)
    //console.log('blogsRouter.put X: ', request.params.id, ' nok: ', nok, ' blog: ', blogUpdated)  

    if (nok.length !== 0) {
    response.status(400).json({ error: nok })
    return
    }

    try {
    //const blogSaved = await Blog.findOneAndUpdate(request.params.id, blog, {new: true})
    const blog = await Blog.findByIdAndRemove(request.params.id)
    console.log('blogsRouter.put delete: ', request.params.id, ' blog: ', blog)  
    const blogSaved = await blogUpdated.save()
    response.status(201).json(blogSaved)
    } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
    }
 })


// get one
 blogsRouter.get('/:id', async (request, response) => {
    console.log('blogsRouter.get: ', request.params.id)    
    try {
      const blog = await Blog.findById(request.params.id)
//      console.log('blogsRouter.get async: ', blogs)   
      if (blog === null)
        return response.status(401).json({ error: 'blog not found' })
      response.json(blog)
    } catch (exception) {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
 })


// delete
blogsRouter.delete('/:id', async (request, response) => {
  console.log('blogsRouter.delete: ', request.params.id)    
  try {

    const blog = await Blog.findByIdAndRemove(request.params.id)
    console.log('blogsRouter.delete title: ', blog.title)    
    return response.status(204).end()

} catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})   

// insert
blogsRouter.post('/', async (request, response) => {
  console.log('blogsRouter.post', request.body)    
  const body = new Blog(request.body)
  
  try {

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: (body.likes === undefined || body.likes === null) ? 0 : body.likes 
    })
//    console.log('blogsRouter.title ', blog.title )    
  
  
    if (bolgOk(blog).length > 0) {
      response.status(400).json({ error: bolgOk(blog) })
      return
    }

    const blogSaved = await blog.save()
    response.status(201).json(blogSaved)
  }
  catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }

})



module.exports = blogsRouter