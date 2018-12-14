import React from 'react';
import Otsikko from '../components/Otsikko'
import PropTypes from 'prop-types'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const LoginForm = ({handleSubmit, handleChange, username, password  }) => {
  return(
    <div >

      <Otsikko  nimi='Log in to application'/>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <div>
            <ControlLabel>username</ControlLabel> 
            <FormControl
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </div>
          <div>
            <ControlLabel>password</ControlLabel> 
            <FormControl
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <br></br>
          <Button bsStyle="success" type="submit">login</Button>
        </FormGroup>
      </form>
    </div>
  )
} 

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
  
export default LoginForm