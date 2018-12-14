import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
//    console.log('Blog props:' ,  props)
    this.state = {
      details: false,
      blog: this.props.blog
    }
  }

  toggleDetails = (event) => {
  //  console.log('toggleDetails:' , this.state.blog.title, ' likes:', this.state.blog.likes)
  //  if (event.target.id === 'title') {
      this.setState({details: !this.state.details})
  //  }
  }

  handleLike =  async (event) => {
    console.log('handleLike:' ,  this.state.blog)
    const blogObject = {
      id:  this.state.blog._id,
      title: this.state.blog.title,
      author: this.state.blog.author,
      url: this.state.blog.url,
      likes: this.state.blog.likes + 1,
      user: this.state.blog.user
    }
    console.log('handleLike:' ,  blogObject)

    try {
      const blog = await blogService.update(blogObject.id, blogObject)
      console.log('update likes:' ,  blog)

    } catch(exception) {
      console.log('error:' ,  blogObject)
    }
  } 


  render() {
    const blog = this.props.blog
    //const loggedUser = JSON.parse(window.localStorage.getItem('loggedNoteappUser'))
    //console.log('logged user: ', loggedUser)

    //console.log('Blog render: ', blog._id, ' ', blog.title)

    const hideDetails = { display: this.state.details ? 'none' : '' }
//    const showDetails = { display: this.state.details ? '' : 'none' }
//    const showDelete =  {display: (blog.user === undefined || ( loggedUser === null) || (blog.user.username === loggedUser.username)) ? '' : 'none' }

    const blogStyle = {
      paddingTop: 5,
      marginTop: 5,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

/*
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
      color: 'Blue',
      background: 'CornflowerBlue'
    }
*/
    const blogTitle = (toggleDetails) => {
      //console.log('blogTitle:', blog)
      return(
         <div className="title"><a href='# ' onClick={toggleDetails} id={blog._id}>{blog.title}</a></div>
      )
    }

    return (
      <div style={blogStyle}  className="content">

        <div style={hideDetails}>
          {blogTitle(this.props.clickHandler)}
        </div>

      </div>
    )
  }
}


export default Blog