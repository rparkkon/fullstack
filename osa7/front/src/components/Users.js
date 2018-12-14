import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import {initializeusers} from '../reducers/userReducer'
import {notify} from '../reducers/notificationReducer'


class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // users: [],
      showAll: true,
      error: null,
      info: null,
      sort: null,
      id: '',
      details: false
    }
  }

  async componentWillMount() {
    this.props.initializeusers()
  }

  toggleDetails = (event) => {
    //console.log('toggleDetails:' , event.target.id)
    this.setState({id: event.target.id})
  }


  render() {

    const userBlogs = (id) => {
      const user = this.props.users.find( (u) => u.id === this.state.id)
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
            {this.props.users.map(user => <tr key={user.id}><td><a href='# ' id={user.id} onClick={this.toggleDetails}>{user.name}</a></td><td>{user.blogs.length}</td><td>{user.username}</td></tr>)}
          </tbody>
        </Table>
      </div>
    )
  }
}

//export default Users
const mapStateToProps = (state) => {
//console.log('MapStateToProps: state ', state) 
  return {
    users: state.users,
    notification: state.notification
  }
}
export default connect(
  mapStateToProps,
  { initializeusers,
    notify }
)(Users)
  
