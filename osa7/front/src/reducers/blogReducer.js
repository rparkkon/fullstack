import blogService from '../services/blogs'

const blogReducer = (store = [], action) => {
  console.log('blogReducer ACTION: ', action)
  if (action.type==='UPDATE') {
    console.log('reducer id: ', action.data._id)
    const old = store.filter(a => a._id !==action.data._id)
    const updated = store.find(a => a._id === action.data._id)
    return [...old, updated]
  }
  if (action.type === 'INSERT') {
    console.log('reducer INSERT: ', action.data)
    const blog = action.data 
    return [...store, blog]
  }
  if (action.type === 'INIT_BLOG') {
    //console.log('reducer INIT_BLOG: ', action.data)
    return action.data
  }

  if (action.type === 'SORT_ABC') {
    const sorted = store.sort((a, b) => (a.title === b.title ? 0 : (a.title > b.title) ? 1 : -1))
    console.log('sorted: ', sorted)
    return store.sort((a, b) => (a.title === b.title ? 0 : (a.title > b.title) ? 1 : -1))
  }

  if (action.type === 'REMOVE') {
    //console.log('reducer REMOVE: ', action.data)
    return store.filter(a => a._id !==action.data._id)
  }
  
  return store
}

/*
const updateBlog = (oblog) => {
  return async (dispatch) => {
    const blog = await blogService.update(oblog._id, oblog)
    dispatch({
      type: 'UPDATE',
      data: blog
    })
  }
}
*/

export const sortBlogs = (abc = false) => {
  return async (dispatch) => {
    dispatch({
      type: abc ? 'SORT_ABC' : 'SORT_LIKE'
    })
  }
}


export const initializeblogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOG',
      data: blogs
    })
  }
}

export const createNew = (content) => {
  return async (dispatch) => {
    const newblog = await blogService.create(content)
    dispatch({
      type: 'INSERT',
      data: newblog
    })
  }
}

export const removeBlog = (data) => {
  console.log('blog removeBlog: ', data)
  return async (dispatch) => {
    await blogService.deleteOne(data._id)
    dispatch({
      type: 'REMOVE',
      data
    })
  }
}

export const blogLike = (data) => {
  const oblog = data
  oblog.likes = oblog.likes +1  
  console.log('blog like: ', oblog)
  return async (dispatch) => {
    const blog = await blogService.update(oblog._id, oblog)
    console.log('blog updated: ', blog)
    dispatch({
      type: 'UPDATE',
      data: blog
    })
  }
}

export const blogComment = (data, comment) => {
  const oblog = data
  oblog.comments = oblog.comments.concat(comment)  
  console.log('blog comment: ', comment, ' ', oblog)
  return async (dispatch) => {
    const blog = await blogService.update(oblog._id, oblog)
    dispatch({
      type: 'UPDATE',
      data: blog
    })
  }
}

export const blogUpdate = (data) => {
  console.log('blog update: ', data)
  return async (dispatch) => {
    const blog = await blogService.update(data._id, data)
    dispatch({
      type: 'UPDATE',
      data: blog
    })
  }
}


export default blogReducer