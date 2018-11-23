const supertest = require('supertest')
const { app, server } = require('../bck/index')
const api = supertest(app)

const format = (blog) => {
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}  

const dummy = (blogs) => {
    // ...
    return 1
  }

  
const blogsInDb = async () => {
    const response = await api
        .get('/api/blogs')

    console.log('response.body.length:',  response.body.length) 
    const  blogs = response.body
    /*
    afterAll(() => {
        server.close()
    })
    */
    return blogs.map(format)
  }

  module.exports = {
    dummy,
    blogsInDb
}