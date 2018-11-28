import React from 'react';

const NewBlog = ({ handleNew, handleTextChange, title, author, url}) =>  {
  return ( 
    <div>
        <h1>create new</h1>
        <form onSubmit={handleNew}>
        <div>
          title
          <input
            type="text"
            name="title"
            onChange={handleTextChange}
          />
        </div>
        <div>
          author
          <input
            type="text"
            name="author"
            onChange={handleTextChange}
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="url"
            onChange={handleTextChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default NewBlog