const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
  }
const murl = process.env.MONGODB_URI

mongoose.connect(murl, { useNewUrlParser: true })

const Blog = mongoose.model('Blogs', {
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  

let title
let author
let url
let n

process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
    if (index === 2) {
        title = val
    }
    if (index === 3) {
        author = val
    }
    if (index === 4) {
        url = val
    }
    n = index
  });

//  console.log(`index: ${n}`);
  if (n > 1) {
    const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: 0
    })

    console.log(`Lisätään blog: ${blog.title} author ${blog.author} url ${blog.url}` );
    //mongoose.connection.close()

    blog
    .save()
    .then(result => {
        console.log('blog saved!')
        mongoose.connection.close()
    })
}
else {
    console.log(`Lista:`);

    Blog
    .find({})
    .then(result => {
        result.forEach(blog => {
            console.log(`${blog.title} ${blog.author}  ${blog.url} likes:  ${blog.likes} id:  ${blog._id}`);
        })
        mongoose.connection.close()
    })
}