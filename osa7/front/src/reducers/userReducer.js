import userService from '../services/users'


const userReducer = (store = [], action) => {
  console.log('userReducer ACTION: ', action)
  if (action.type === 'INIT_USER') {
    console.log('reducer INIT_BLOG: ', action.data)
    return action.data
  }
  return store
}

export const initializeusers = () => {
  return async (dispatch) => {
    const blogs = await userService.getAll()
    dispatch({
      type: 'INIT_USER',
      data: blogs
    })
  }
}

export default userReducer