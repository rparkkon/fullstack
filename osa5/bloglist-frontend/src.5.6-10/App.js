import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import LoginForm from './components/LoginForm'

import './index.css'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: '',
      showAll: true,
      error: null,
      info: null,
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
      display: null,
      sort: null,
      user: null
    }
  }
  
  async componentDidMount() {
    try {
      const raw = await blogService.getAll()
      const blogs = raw.sort((a, b ) => b.likes - a.likes)
//      console.log('componentDidMount sorted:', blogs)
      
      this.setState({ blogs })
    } catch(exception) {
      this.setState({
        error: 'did not mount',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000) 
    }
  } 

  showError = (err) => {
    this.setState({
      error: err
    })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  
  }

  login = async (event) => {
    event.preventDefault()
   // console.log('login in with', this.state.username, this.state.password)
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      this.setState({ username: '', password: '', user})
 
    } catch(exception) {
        this.showError('käyttäjätunnus tai salasana virheellinen')
    }
  }

  logout = async (event) => {
    event.preventDefault()
//    console.log('logout user ', this.state.user.name)
    window.localStorage.removeItem('loggedNoteappUser')
    window.location.reload();
  }

  newBlog = async (event) => {
    event.preventDefault()
  //  console.log('newBlog for user ', this.state.user.name)

    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
  //  console.log('new blog', blogObject)
    try {
      const newBlog = await blogService.create(blogObject)
      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        newBlog: '',
        info: 'A new blog "'.concat(this.state.title).concat('" by ').concat(this.state.author).concat(' added!')
      })
      setTimeout(() => {
        this.setState({ info: null })
      }, 5000)
    }
    catch (error) {
      this.showError('ei mee')
    }     
}

  handleTextFieldChange = (event) => {
    //console.log(event.target.name, event.target.value)
    this.setState({ [event.target.name]: event.target.value })    
  }  
 
  handleSort= (event) => {
    const s = !this.state.sort
    const sorted = this.state.blogs.sort((a, b) => (s ? a.likes : b.likes) - (s ? b.likes : a.likes))
    this.setState({ sort: s, blogs: sorted})    
  }

  handleDelete = async (event) => {
    event.preventDefault()
    const id = event.target.id
    const blog = this.state.blogs.find(blog => blog._id === id)
    if (blog &&  window.confirm(`delete '${blog.title}' by ${blog.author} ?`)) {
     // console.log('handleDelete:' ,  blog)
     
      try {
        await blogService.deleteOne(id)

        // remove object
        const newBlogs = this.state.blogs
        let i = newBlogs.findIndex(o => o._id === id);
        if (i > -1) {newBlogs.splice(i, 1)}         
        this.setState({
          blogs: newBlogs
        })

      } catch(exception) {
          //console.log('error:' ,  exception)
          if (exception.type === 'error') {
            console.log('exception.type: ',exception.type, exception.message)
          }          
          this.showError(`'${blog.title}' by ${blog.author} cannot be deleted by this user`)
      }
    }
  }
  

  handleLike =  async (event) => {
    event.preventDefault()
    const id = event.target.id
   // console.log('handleLike:' , id) //  this.state.blog)
    const blog = this.state.blogs.find(blog => blog._id === id)
    if (blog) {
      const blogObject = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user
      }
    //  console.log('handleLike:' ,  blogObject)

      try {
        const newBlog = await blogService.update(id, blogObject)
     //   console.log('update likes:' ,  newBlog)

        // replace object
        const newBlogs = this.state.blogs
        let i = newBlogs.findIndex(o => o._id === id);
        if (newBlogs[i]) { newBlogs[i] = newBlog } else { newBlogs.push(newBlog) };
        
        this.setState({
          blogs: newBlogs
        })
      } catch(exception) {
        console.log('error:' ,  blogObject)
      }
    }
  } 



  render() {
//    console.log('render: ', unnsorted)

    const loginForm = () => (
      <Togglable buttonLabel="login">
      <LoginForm
            handleSubmit={this.login}
            handleChange={this.handleTextFieldChange}
            username={this.state.username}
            password={this.state.password} 
            />
      </Togglable>
    )
  
  const newBlogForm = () => (
    <Togglable buttonLabel="new blog">
      <NewBlog 
        handleNew={this.newBlog} 
        handleTextChange={this.handleTextFieldChange} 
        title={this.state.title}
        author={this.state.author}
        url={this.state.url}
      />
    </Togglable> 
   )

   return (
    <div>
        <Notification message={this.state.error} classType="error" />
 
      { this.state.user === null ? loginForm() :
        <div>
        <Notification message={this.state.info} classType="info" />
        <p>{this.state.user.name} logged in</p>
        <form onSubmit={this.logout}>
        <button type="submit">logout</button>
        </form> 

        {newBlogForm()}

        <h2 onClick={this.handleSort}>blogs</h2>

          {this.state.blogs.map(blog => 
            <Blog key={blog._id} blog={blog} thisUser={this.state.user} likeHandler={this.handleLike} deleteHandler={this.handleDelete}/>
          )}

        </div>
      }
     </div>
    )
  }
}

export default App;
