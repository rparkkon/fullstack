import React from 'react';

const NewBlog = (props) =>  {
  return ( 
    <div>
        <h1>{props.header}</h1>
        <form onSubmit={props.createNew}>
        <div>
          title
          <input
            type="text"
            name="title"
            onChange={props.handleTextChange}
          />
        </div>
        <div>
          author
          <input
            type="text"
            name="author"
            onChange={props.handleTextChange}
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="url"
            onChange={props.handleTextChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default NewBlog