import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import '../index.css'

class Notification extends React.Component {

  render() {
    /*
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    */
    //console.log('notification: ', this.props.notification, 'style: ', this.props.classtype)

    if ( this.props.notification === undefined || this.props.notification.length === 0 ) 
      return('')
    return (
      <div className={this.props.classtype}>
        <Alert>
          {this.props.notification}
        </Alert>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log('Notification MapStateToProps: state ', state) 
  return {
    notification: state.notification
  //  classtype: state.classtype
  }
}
export default connect(
  mapStateToProps
)(Notification)

