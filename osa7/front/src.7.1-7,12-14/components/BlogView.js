import React from 'react'
import Blog from '../components/Blog'
import blogService from '../services/blogs'
import Togglable from '../components/Togglable'
import Notification from '../components/Notification'
import NewBlog from '../components/NewBlog'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

//import SimpleBlog from './components/SimpleBlog'


import './../index.css'


class BlogView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: '',
      showAll: true,
      error: null,
      info: null,
      title: '',
      author: '',
      url: '',
      display: null,
      sort: null,
      blog: null,
      comment: ''
    }
  }

  // Integraatiotestaus tehtävä 5.16 ???
  /*
  componentDidMount() {
    blogService
        .getAll()
        .then(blogs => this.setState({ blogs }))
    }  
*/
  async componentDidMount() {
    try {
      const raw = await blogService.getAll()
      const blogs = raw.sort((a, b ) => b.likes - a.likes)
      
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

  newBlog = async (event) => {
    event.preventDefault()
    //console.log('BlogView newBlog for user ', this.state.user.name)

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
    console.log(event.target.name, event.target.value)
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
          blogs: newBlogs,
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
    const blog = this.state.blogs.find((a) => a._id === id)
    // console.log('handle xxx Click:' , blog)
    this.setState({blog})
  }

  handleLike =  async (event) => {
    event.preventDefault()
    const id = event.target.id
    //    console.log('handle x Like:' , id) //  this.state.blog)
    const blog = this.state.blogs.find(blog => blog._id === id)
    if (blog) {
      const blogObject = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user,
        comments: blog.comments
      }
      console.log('handleLike:' ,  blogObject)

      try {
        const newBlog = await blogService.update(id, blogObject)
        //   console.log('update likes:' ,  newBlog)

        // replace object 
        const newBlogs = this.state.blogs
        let i = newBlogs.findIndex(o => o._id === id);
        if (newBlogs[i]) { newBlogs[i] = newBlog } else { newBlogs.push(newBlog) };
        
        this.setState({
          blogs: newBlogs,
          blog: newBlog
        })

      } catch(exception) {
        console.log('error:' ,  blogObject)
      }
    }
  } 

  handleNewComment =  async (event) => {
    event.preventDefault()
    const id = event.target.id
    console.log('handle handleNewComment:' ,  event.target.id) //  this.state.blog)
    const blog = this.state.blogs.find(blog => blog._id === id)
    if (blog) {
      const blogObject = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user,
        comments: blog.comments.concat(this.state.comment)
      }
      //  console.log('handleLike:' ,  blogObject)

      try {
        const newBlog = await blogService.addComment(id, blogObject)
        //   console.log('update likes:' ,  newBlog)

        // replace object 
        const newBlogs = this.state.blogs
        let i = newBlogs.findIndex(o => o._id === id);
        if (newBlogs[i]) { newBlogs[i] = newBlog } else { newBlogs.push(newBlog) };
        
        this.setState({
          blogs: newBlogs,
          blog: newBlog,
          comment:'',
          info: 'A new comment "'.concat(this.state.comment).concat('" to blog "').concat(newBlog.title).concat('" added!')
        })
        setTimeout(() => {
          this.setState({ info: null })
        }, 5000)
  
      } catch(exception) {
        console.log('error:' ,  blogObject)
      }
    }
  } 

  render() {
  //  console.log('render: ', this.state)
  /*
    const blogStyle = {
        paddingTop: 5,
        marginTop: 5,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
*/
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

/*
    const lineHeight = (fontSize) => {
        const multiplier = (fontSize > 20) ? 1.5 : 1
        return parseInt(fontSize * multiplier, 10)
    }  
*/

    const listStyleDetails = {
      //fontFamily: 'OpenSans',
      // fontSize: font_size,
      lineHeight: 0.2 
    }

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


    const showBlogs = () => (
      <div className="container">
        <h2 onClick={this.handleSort}>blogs</h2>

        {this.state.blogs.map(blog => 
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
          {blog.comments.map(comment => <li style={listStyleDetails} key={comment} id={blog._id}><ul>{comment}</ul></li> )}
        </div>

      </div>
    )

    const blogDetails = (blog, handleLike, handleDelete, handleChange, handleNewComment, newComment) => {
      //  console.log('blog xxx Details:', handleLike)
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
          <Notification message={this.state.info} classType="info" />
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

export default BlogView;
