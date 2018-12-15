import React from 'react'
import { connect } from 'react-redux'
import Blog from '../components/Blog'
import Togglable from '../components/Togglable'
import Notification from '../components/Notification'
import NewBlog from '../components/NewBlog'
import {initializeblogs, createNew, blogUpdate, sortBlogs, removeBlog, blogLike, blogComment} from '../reducers/blogReducer'
import {notify} from '../reducers/notificationReducer'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

//import SimpleBlog from './components/SimpleBlog'


import './../index.css'


class BlogView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    //  blogs: [],
      newBlog: '',
      showAll: true,
      error: null,
      info: null,
      errorStyle: '',
      title: '',
      author: '',
      url: '',
      display: null,
      sort: null,
      blog: null,
      comment: ''
    }
  }

  async componentWillMount() {
    //console.log('initializeblogs: ', initializeblogs) 
    //console.log('this.props.initializeblogs: ', this.props.initializeblogs)
    this.props.initializeblogs()
  }

  showError = (err) => {
    this.setState({
      error: err
    })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  
  }

  newBlog = async (event) => {
    event.preventDefault()
    //console.log('BlogView newBlog for user ', this.state.user.name)

    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    console.log('new blog', blogObject)
    try {
      await this.props.createNew(blogObject) //  blogService.create(blogObject)
      this.setState({
        newBlog: '',
        title: '',
        author: '',
        url: '',
        errorStyle: 'info'
      })
      this.props.notify('A new blog "'.concat(blogObject.title).concat('" by ').concat(blogObject.author).concat(' added!'), 5)
      this.newBlogForm.toggleVisibility()
    }
    catch (error) {
      this.setState({errorStyle: 'error'})
      this.props.notify('ei mee')
    }     
  }

  handleTextFieldChange = (event) => {
    //console.log(event.target.name, event.target.value)
    this.setState({ [event.target.name]: event.target.value })    
  }  
 
  handleSort= (event) => {
    console.log('handleSort: ' ,  event.target.id) // this.props)
    if (event.target.id === 'abc') {
    //  this.props.sortBlogs(true)
      const s = !this.state.sort
      const sorted = this.props.blogs.sort((a, b) => 
        s ? (a.title === b.title ? 0 : (a.title > b.title) ? 1 : -1) 
          : (b.title === a.title ? 0 : (b.title > a.title) ? 1 : -1))
      this.setState({ sort: s, blogs: sorted})    
    }
    else {
      const s = !this.state.sort
      const sorted = this.props.blogs.sort((a, b) => (s ? a.likes : b.likes) - (s ? b.likes : a.likes))
      this.setState({ sort: s, blogs: sorted})    
    }
  }

  handleDelete = async (event) => {
    event.preventDefault()
    const id = event.target.id
    const blog = this.props.blogs.find(blog => blog._id === id)
    if (blog &&  window.confirm(`delete '${blog.title}' by ${blog.author} ?`)) {
    // console.log('handleDelete:' ,  blog)
     
      try {
        await this.props.removeBlog(blog)
        this.setState({
          blog: null
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

  handleClick= (event) => {
    event.preventDefault()
    const id = event.target.id
    const blog = this.props.blogs.find((a) => a._id === id)
    // console.log('handle xxx Click:' , blog)
    this.setState({blog})
  }

  handleLike =  async (event) => {
    event.preventDefault()
    const id = event.target.id
    //    console.log('handle x Like:' , id) //  this.state.blog)
    const blog = this.props.blogs.find(blog => blog._id === id)
    if (blog) {
      try {
        await this.props.blogLike(blog)  
        //console.log('update likes:' ,  blog)

        this.setState({
          blog: blog
        })

      } catch(exception) {
        //console.log('error:' ,  blogObject)
        this.setState({errorStyle: 'error'})
        this.props.notify('New like for "'.concat(blog.title).concat('" NOT ADDED!'), 5)
      }
    }
  } 

  handleNewComment =  async (event) => {
    event.preventDefault()
    const id = event.target.id
    console.log('handle handleNewComment:' ,  event.target.id) //  this.state.blog)
    const blog = this.props.blogs.find(blog => blog._id === id)
    if (blog) {
      try {
        const newcomment = this.state.comment
        await this.props.blogComment(blog, newcomment)

        this.setState({
          comment:'',
          errorStyle: 'info'
        })
        this.props.notify('A new comment "'.concat(newcomment).concat('" to blog "').concat(blog.title).concat('" added!'), 5)

      } catch(exception) {
        console.log('error:' ,  blog)
        this.setState({errorStyle: 'error'})
        this.props.notify('A new comment "'.concat(this.state.comment).concat('" NOT ADDED!'), 5)
      }
    }
  } 

  render() {
    // console.log('render: ', this.state)

    const blogStyleDetails = {
      paddingTop: 5,
      paddingLeft: 10,
      border: 'none',
      lineHeight: 0,
      letterSpacing: 0,
      borderWidth: 1,
      marginBottom: 5
    }

    const deleteStyleDetails = {
      color: 'Black',
      background: 'Cyan'
    }

    const headerStyleDetails = {
      color: 'blue',
      // background: 'Cyan'
    }

    const listStyleDetails = {
      //fontFamily: 'OpenSans',
      // fontSize: font_size,
      lineHeight: 0.2 
    }

    const newBlogForm = () => (
      <Togglable buttonLabel="new blog" ref={component => this.newBlogForm = component}>
        <NewBlog 
          handleNew={this.newBlog} 
          handleTextChange={this.handleTextFieldChange} 
          title={this.state.title}
          author={this.state.author}
          url={this.state.url}
        />
      </Togglable> 
    )


    const showBlogs = () => (
      <div className="container">
        <div>
          <h2 onClick={this.handleSort} id='like'>blogs</h2>
          <Button onClick={this.handleSort} id='like'>sort blogs like</Button>
          <Button onClick={this.handleSort} id='abc'>sort blogs abc</Button>
        </div>

        {this.props.blogs.map(blog => 
          <Blog key={blog._id} blog={blog} thisUser={this.state.user} clickHandler={this.handleClick}/>
        )}
      
      </div>
    )

    const showBlogComments = (blog, handleChange, handleNew, comment) => (
      <div>
        <h2 style={headerStyleDetails}>comments</h2>
        <div>
          <form id = {blog._id} onSubmit={handleNew}>
            <FormGroup>
              <div>
                <ControlLabel></ControlLabel> 
                <FormControl
                  name="comment"
                  value={comment}
                  onChange={handleChange}
                />
                <Button id={blog._id} bsStyle="success" type="submit">add comment</Button>
              </div>
            </FormGroup>
          </form>
        </div>

        <div>
          {blog.comments.map((comment,idx) => <li style={listStyleDetails} key={idx} id={blog._id}><ul>{comment}</ul></li> )}
        </div>

      </div>
    )

    const blogDetails = (blog, handleLike, handleDelete, handleChange, handleNewComment, newComment) => {
      //console.log('blog xxx Details:', blog)
      if (blog === undefined || blog === null)
        return('')

      const loggedUser = JSON.parse(window.localStorage.getItem('loggedNoteappUser'))
      const showDelete =  {display: (blog.user === undefined || ( loggedUser === null) || (blog.user.username === loggedUser.username)) ? '' : 'none' }

      return (
        <div className="container">
          <div className="showDetails"> 
            <div className="title"><h2>{blog.title}</h2></div> 
            <div style={blogStyleDetails} className="contents"> 
              <div>
                <ControlLabel className="author"><p>{blog.author}</p></ControlLabel> 
                <div className="url"><p>{blog.url}</p></div>  
                <div className="likes"><p>{blog.likes} likes <Button bsStyle="success"  onClick={handleLike} id={blog._id}> Like</Button></p></div>  
                {blog.user === undefined ? '' :  <p>added by {blog.user.name}</p>}
                <div style={showDelete}>
                  <p><Button style={deleteStyleDetails} onClick={handleDelete} id={blog._id}>Delete</Button>  </p>
                </div>

                {showBlogComments(blog, handleChange, handleNewComment, newComment)} 

              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="blogView">
        <div>
          <Notification classtype={this.state.errorStyle}/>
        </div>    

        <h2>blog view</h2>

        {newBlogForm()}

        {blogDetails( this.state.blog
          , this.handleLike
          , this.handleDelete
          , this.handleTextFieldChange
          , this.handleNewComment
          , this.state.comment
        )
        }

        {showBlogs()}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log('MapStateToProps: state ', state) 
  return {
    blogs: state.blogs,
    notification: state.notification
  }
}
//export default BlogView;
export default connect(
  mapStateToProps,
  { initializeblogs,
    createNew,
    blogUpdate,
    sortBlogs,
    removeBlog,
    blogLike,
    blogComment,
    notify }
)(BlogView)
