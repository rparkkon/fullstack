
const notificationReducer = (state = '', action) => {
  console.log('notificationReducer ACTION: ', action)
  if (action.type==='SET') {
    console.log('reducer notificationReducer: ', action.notification)
    return action.notification
  }
 return state
}
/*
export const notificationChange = (notification) => {
  console.log('reducer NOTIFY: ', notification)
  return {
    type: 'SET',
    notification
  }
}
*/
export const notify = (notification, secs) => {
  console.log('reducer notify: ', notification, ' ', secs)
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