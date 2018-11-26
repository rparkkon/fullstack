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

const getTokenFrom = (request) => {
  let token = null
  let decodedToken = null
  const authorization = request.get('authorization')
  console.log('getTokenFrom: ', authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token =  authorization.substring(7)
  }
  if (token) {
    decodedToken = jwt.verify(token, process.env.SECRET)
  }
  if (!token || !decodedToken.id) {
    return  null
  }
  return decodedToken
}

// get all
blogsRouter.get('/', async (request, response) => {
  //    console.log('blogsRouter.get: ', request.route)    
    try {
      const blogs = await Blog.find({})
                              .populate('User', {username: 1, name: 1})

//      console.log('blogsRouter.get async: ', blogs)    
      response.json(blogs) // .map(Blog.format))

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
      response.json(Blog.format(blog))

    } catch (exception) {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
 })


// delete
blogsRouter.delete('/:id', async (request, response) => {
  console.log('blogsRouter.delete: ', request.params.id)    
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {

      // 4.21* only user's own blog can be deleted  
      const decodedToken = getTokenFrom(request)
      console.log('delete token: ', decodedToken)

      if (decodedToken === null) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }    

      const user = await User.findById(decodedToken.id)
      console.log('user: ', user, ' _id: ' , user._id.toString() )    
      if ( user && blog.user._id.toString() === user._id.toString() ) {       
        const blogs = await Blog.findByIdAndRemove(request.params.id)
        return response.status(204).end()
      }
      else {
        return response.status(401).json({ error: 'invalid user' })
      }
    }
    else {
      return response.status(401).json({ error: 'blog not found' })
    }
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

    const decodedToken = getTokenFrom(request)

    if (decodedToken === null) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }    

    const user = await User.findById(decodedToken.id)
    console.log('user: ', user )    

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: (body.likes === undefined || body.likes === null) ? 0 : body.likes ,
      user: user
    })
//    console.log('blogsRouter.title ', blog.title )    
  
  
    if (bolgOk(blog).length > 0) {
      response.status(400).json({ error: bolgOk(blog) })
      return
    }

    const blogSaved = await blog.save()

    if (blogSaved) {
      user.blogs = user.blogs.concat(blogSaved._id)
      await user.save()
    } 
        
    response.status(201).json(blogSaved)
  }
  catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }

})



module.exports = blogsRouter