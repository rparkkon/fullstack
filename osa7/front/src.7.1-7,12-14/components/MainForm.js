import React from 'react'
import Togglable from '../components/Togglable'
import LoginForm from '../components/LoginForm'
import Notification from '../components/Notification'
import Menu from '../components/Menu'
import loginService from '../services/login'
import blogService from '../services/blogs'

class MainForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      info: null,
      username: '',
      password: '',
      user: null
    }
  }  

  async componentDidMount() {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  logout = async (event) => {
    event.preventDefault()
    if (typeof window !== undefined) {
      console.log('MainForm logout xxx user ', this.state.user.name, ' path: ', window.location.href, ' history:', this.props.history)
      this.props.history.push('/')
      window.localStorage.removeItem('loggedNoteappUser')
      window.location.reload()
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
    console.log('login in with', this.state.username, this.state.password)
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

  handleChange = (event) => {
  //  console.log(event.target.name, event.target.value)
    this.setState({ [event.target.name]: event.target.value })    
  }

  render() {
    const loginForm = () => (
      <div>
        <Notification message={this.state.error} classType="error" />
    
        <Togglable buttonLabel="login">
          <LoginForm
            handleSubmit={this.login}
            handleChange={this.handleChange}
            username={this.state.username}
            password={this.state.password} 
          />
        </Togglable>
      </div>
    )
//    console.log('usr:', this.state.user)

    if (this.state.user === null) 
      return loginForm()
    return(
      <div>
        <h2>blog app</h2>
        <Menu user={this.state.user} logout={this.logout} history={this.props.history} />
      </div>    
    )
  }
}
export default MainForm