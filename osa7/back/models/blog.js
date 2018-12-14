const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: { type: mongoose.Schema.Types.Object, ref: 'User' },
    comments: [String]
    })

  blogSchema.statics.format = (blog) => {
    return {
      id: blog._id,
      user: blog.user,  // User.format ????
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      comments: blog.comments
    }
  }

  const Blog = mongoose.model('Blog', blogSchema)

  module.exports = Blog