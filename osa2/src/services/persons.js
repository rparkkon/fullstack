import axios from 'axios'
const baseUrl = 'http://192.168.224.153:3001/persons'

const getAll = () => {
   const request = axios.get(baseUrl)
   console.log('persons getAll:',  request)
   const nonExisting = {
    name: 'Tätä nimeä ei ole palvelimelta',
    number: '12345678'
  }   
   return request.then(response => response.data.concat(nonExisting))
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject) 
  return request.then(response => response.data) 
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, create, update }