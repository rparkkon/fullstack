import React from 'react'
import { FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import PropTypes from 'prop-types'

const NewBlog = ({ handleNew, handleTextChange, title, author, url}) =>  {
  return ( 
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNew}>
        <FormGroup>
          <div>
            <ControlLabel>title</ControlLabel> 
            <FormControl
              name="title"
              value={title}
              onChange={handleTextChange}
            />
          </div>
          <div>
            <ControlLabel>author</ControlLabel> 
            <FormControl
              name="author"
              value={author}
              onChange={handleTextChange}
            />
          </div>
          <div>
            <ControlLabel>url</ControlLabel> 
            <FormControl
              name="url"
              value={url}
              onChange={handleTextChange}
            />
          </div>
          <br></br>
          <Button bsStyle="success" type="submit">create</Button>
        </FormGroup>
      </form>
    </div>
  )
}

NewBlog.propTypes = {
  handleNew: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default NewBlog