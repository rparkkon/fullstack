import React from 'react'
import {NavLink} from 'react-router-dom'

class Menu extends React.Component {

  render() {
    const backgroundColor = 'rgba(255, 255, 128, .5)'

    return(
      <div style={{
        border: 'none',
        padding: 10,
        borderWidth: 5,
        backgroundColor: backgroundColor,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
      }}>

        <NavLink to="/api/blogs" 
          style={{  background: "cyan", ":hover": { background: "yellow" } }}
          activeStyle={{fontWeight: "bold", color: "red"}}
        >blogs</NavLink> &nbsp;

        <NavLink to="/api/users" 
          style={{ background: "cyan", ":hover": { background: "yellow" } }}
          activeStyle={{fontWeight: "bold", color: "red"}}
        >users</NavLink>  &nbsp;

        <NavLink to="/about" 
          style={{ background: "cyan", ":hover": { background: "yellow" } }}
          activeStyle={{fontWeight: "bold", color: "red"}}
        >about</NavLink>

        {this.props.user === null ? '' :  
          <em><form onSubmit={this.props.logout}>
            <p>{this.props.user.name} logged in &nbsp;
              <button type="submit">logout</button>
            </p>
          </form> 
          </em> }
      </div>
    )
  }
}
export default Menu