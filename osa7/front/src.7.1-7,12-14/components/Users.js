import React from 'react'
import { Table } from 'react-bootstrap'
import userService from '../services/users'

//import Blog from '../components/Blog'
//import loginService from './services/login'
//import Togglable from './components/Togglable'
//import Notification from './components/Notification'

//import './index.css'


class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      showAll: true,
      error: null,
      info: null,
      sort: null,
      id: '',
      details: false
    }
  }

  async componentDidMount() {
    try {
      const users = await userService.getAll()
      console.log('Users getAll: ', users)
//      const blogs = raw.sort((a, b ) => b.likes - a.likes)
      
      this.setState({ users })
    } catch(exception) {
      this.setState({
        error: 'did not mount',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000) 
    }
  } 

  toggleDetails = (event) => {
    console.log('toggleDetails:' , event.target.id)
    this.setState({id: event.target.id})
   }


render() {

    const userBlogs = (id) => {
        const user = this.state.users.find( (u) => u.id === this.state.id)
        console.log('userBlogs: ', user)
        if (user === undefined)  {
            return('') 
        }
        return(
            <div>
                <h2>{user.name}</h2>
                <p>Added blogs</p>
                <ul>
                {user.blogs.map(blog => <li key={blog._id}>  {blog.title}</li> // thisUser={this.state.user} likeHandler={this.handleLike} deleteHandler={this.handleDelete}/>
                )}
                </ul>
            </div>
        )
    }

//  {this.state.users.map(user => <tr key={user.id}><td><a href='# ' id={user.id} onClick={this.toggleDetails}>{user.name}</a></td><td>{user.blogs.length}</td><td>{user.username}</td></tr>)}
//  {this.state.users.map(user => <tr key={user.id}><td><Link to={`/users/${user.id}`} onClick={this.toggleDetails}>{user.name}</Link></td><td>{user.blogs.length}</td><td>{user.username}</td></tr>)}

    return(
        <div>

        <div>
           {userBlogs()}
        </div>
   
        <h2>users</h2>
        
        <Table striped >    
        <thead>
            <tr><th></th><th>blogs added</th><th>xxx</th></tr>
        </thead>
        <tbody>
        {this.state.users.map(user => <tr key={user.id}><td><a href='# ' id={user.id} onClick={this.toggleDetails}>{user.name}</a></td><td>{user.blogs.length}</td><td>{user.username}</td></tr>)}
        </tbody>
        </Table>

        </div>
    )
}
}

export default Users
