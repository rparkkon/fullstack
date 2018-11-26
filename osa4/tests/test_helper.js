const supertest = require('supertest')
const { app, server } = require('../index')
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

 const filter = (blog) => {
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
      url: blog.url,
    }
  }
  
  const filterUser = (user) => {
    return {
      name: user.name,
      username: user.username,
      adult: user.adult
    }
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