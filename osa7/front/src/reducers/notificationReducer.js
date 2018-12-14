
const notificationReducer = (state = '', action) => {
  //console.log('notificationReducer ACTION: ', action)
  if (action.type==='SET') {
    //console.log('reducer notificationReducer: ', action.notification) //, ' ', action.classtype)
    return action.notification
  }
  return state
}

export const notify = (notification, secs) => {
  //console.log('reducer notify: ', notification, ' ', secs)
  return async (dispatch) => {
    dispatch({
      type: 'SET',
      notification
    }) 
    setTimeout(() => { 
      dispatch({
        type: 'SET',
        notification: ''
      }) }, secs * 1000)
  }
}


export default notificationReducer