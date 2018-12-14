import axios from 'axios'
const baseUrl = '/api/users'

//let token

const getAll = async () => {
  let response
  try {
    response = await axios.get(baseUrl)
  }
  catch (error) {
  }  
  return response.data
}


export default { getAll }