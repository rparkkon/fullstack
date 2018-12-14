import React from 'react'

class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  onChange = (e) => {
    this.setState({ formInput: e.target.value })
  }
  render() {
    return (
      <LoginForm
        username={this.state.username}
        password={this.state.password}
        handleSubmit={this.props.onSubmit}
        handleChange={this.onChange}
      />
  )}
}
