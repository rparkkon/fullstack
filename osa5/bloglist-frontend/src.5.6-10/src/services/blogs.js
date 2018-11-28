import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const get = async (id) => {
  console.log('services get: ', id)
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const deleteOne = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log('deleteOne: ', id, ' response.data', response.data)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  console.log('update: ', newObject)
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default 
{ getAll,
  get,
  create,
  update,
  deleteOne,
  setToken
}