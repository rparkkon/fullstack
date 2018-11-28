import axios from 'axios'
const baseUrl = '/api/login'


const login = async (credentials) => {

  let response
  try {
    response = await axios.post(baseUrl, credentials) 
  }
  catch (error) {
  }
  return response.data
}

export default { login }