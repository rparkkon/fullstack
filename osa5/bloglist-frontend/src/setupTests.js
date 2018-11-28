import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
}

window.localStorage = localStorageMock

const user = {
    username: 'tester',
    token: '1231231214',
    name: 'Teuvo Testaaja'
  }
  
window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))