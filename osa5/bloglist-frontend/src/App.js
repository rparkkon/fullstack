import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Otsikko from './components/Otsikko'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
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
      user: null
    }
  }
  

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  } 

  login = async (event) => {
    event.preventDefault()
    console.log('login in with', this.state.username, this.state.password)
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      console.log('user', user)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      this.setState({ username: '', password: '', user})
      console.log('user', this.state.user)

    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    event.preventDefault()
    console.log('logout user ', this.state.user.name)
    window.localStorage.removeItem('loggedNoteappUser')
    this.setState({ user: null })
  }

  newBlog = async (event) => {
    event.preventDefault()
    console.log('newBlog for user ', this.state.user.name)

    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlog: '',
          info: 'A new blog "'.concat(this.state.title).concat('" by ').concat(this.state.author).concat(' added!')
        })
      })
    setTimeout(() => {
      this.setState({ info: null })
    }, 5000)     
}

  handleTextFieldChange = (event) => {
//    console.log(event.target.name, event.target.value)
    this.setState({ [event.target.name]: event.target.value })    
  }  

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.error} classType="error"/>

          <Otsikko  nimi='Log in to application'/>

          <form onSubmit={this.login}>
            <div>
              username
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleTextFieldChange}
              />
            </div>
            <div>
              password
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleTextFieldChange}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      )
    }
    return (
      <div>

      <Notification message={this.state.info}  classType="info" />

      <p>{this.state.user.name} logged in</p>
      <form onSubmit={this.logout}>
        <button type="submit">logout</button>
      </form>

      <NewBlog header='create new' createNew={this.newBlog} handleTextChange={this.handleTextFieldChange} />

      <h2>blogs</h2>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    )
  }
}

export default App;
