import axios from 'axios'
const baseUrl = 'http://192.168.224.153:3001/notes'

const getAll = () => {
   const request = axios.get(baseUrl)
   console.log('getAll:',  request)
   const nonExisting = {
    id: 10000,
    content: 'Tätä muistiinpanoa ei ole palvelimelta',
    date: '2017-12-10T17:30:31.098Z',
    important: true
  }   
   return request.then(response => response.data.concat(nonExisting))
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, create, update }