import axios from 'axios'

const getId = () => (100000*Math.random()).toFixed(0)
const url = 'http://192.168.224.153:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
    const response = await axios.post(url, { content, id: getId(), votes: 0})
    return response.data
  }

const updateOne = async (data) => {
    const response = await axios.put(`${url}/${data.id}`, { content: data.content, id: data.id, votes: data.votes})
    return response.data
  }

const updateVote = async (data) => {
    const response = await axios.put(`${url}/${data.id}`, { content: data.content, id: data.id, votes: data.votes+1})
    return response.data
    }

export default { getAll, createNew , updateOne, updateVote}