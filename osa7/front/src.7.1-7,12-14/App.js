import React from 'react'
import Users from './components/Users'
import BlogView from './components/BlogView'
import MainForm from './components/MainForm'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import './index.css'

class App extends React.Component {
  render() {
    // console.log('render: ', unnsorted)
    return (
      <div className="container">
        <Router>
          <div>
            <Route path="/" render={({history}) => <MainForm history = {history} />} />
            <Route exact path="/api/users" render={() => <Users />} />
            <Route exact path="/api/blogs" render={() => <BlogView />} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App
