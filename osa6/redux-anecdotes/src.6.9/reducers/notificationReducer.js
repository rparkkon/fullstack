
const notificationReducer = (state = '', action) => {
  console.log('notificationReducer ACTION: ', action)
  if (action.type==='SET') {
    console.log('reducer notificationReducer: ', action.notification)
    return action.notification
  }
 return state
}

export const notificationChange = (notification) => {
  return {
    type: 'SET',
    notification
  }
}

export default notificationReducer