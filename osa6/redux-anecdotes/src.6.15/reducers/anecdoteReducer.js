import anecdoteService from '../services/anecdotes'


const getId = () => (100000*Math.random()).toFixed(0)


const anecdoteReducer = (store = [], action) => {
  console.log('anecdoteReducer ACTION: ', action)
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1} ]
  }
  if (action.type==='VOTED') {
    const old = store.filter(a => a.id !==action.data.id)
    const voted = store.find(a => a.id === action.data.id)

    return [...old, { ...voted, votes: voted.votes+1} ]
  }
  if (action.type === 'CREATE') {
    console.log('reducer anecdoteCreate: ', action.content)
    return [...store, { content: action.content, id: getId(), votes:0 }]
  }
  if (action.type === 'INSERT') {
    console.log('reducer INSERT: ', action.data)
    return [...store, { content: action.data.content, id: action.data.id, votes: action.data.votes }]
  }
  if (action.type === 'INIT_ANECDOTE') {
    console.log('reducer INIT_ANECDOTE: ', action.data)
    return action.data
  }

  return store
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes
    })
  }
}

export const createNew = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'INSERT',
      data: newAnecdote
    })
  }
}

export const anecdoteVoteSet = (data) => {
  console.log('ANECDOTE VOTE SET: ', data)
  return async (dispatch) => {
    const anecdote = await anecdoteService.updateVote(data)
    dispatch({
      type: 'VOTED',
      data: anecdote
    })
  }
}

export const anecdoteInsert = (data) => {
  return {type: 'INSERT', data}
}

export const anecdoteCreate = (content) => {
  return {type: 'CREATE', content}
}

export const anecdoteVote = (id) => {
  console.log('anecdoteVote id: ', id)
  return {type: 'VOTE', id}
}

export const anecdoteVoted = (data) => {
  console.log('ANECDOTE VOTED: ', data)
  return {type: 'VOTED', data}
}


export default anecdoteReducer