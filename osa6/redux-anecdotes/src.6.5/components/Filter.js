import React from 'react'
import {filterChange} from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (event) => {
      console.log('Filter handleChange:',  event.target.value)
      this.props.store.dispatch(filterChange(event.target.value))
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

export default Filter