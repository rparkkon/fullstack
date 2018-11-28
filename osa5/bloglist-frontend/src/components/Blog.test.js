import React from 'react'
import { shallow, mount } from 'enzyme'
import SimpleBlog from './SimpleBlog'
import Blog from './Blog'
import App from '../App'
jest.mock('../services/blogs')
import blogService from '../services/blogs'


describe.only('<App />', () => {
    let app
  
    describe('when user is not logged', () => {
      //beforeEach(() => {
        beforeAll(() => {
            app = mount(<App />)
          })
//      })
  
      it('only login form is rendered', () => {
        app.update()
        const loginComponent = app.find('.loginform')
        //console.log('loginComponent:', loginComponent.debug())

        // blog contet ???
        const  blogComponent = app.find('.content')
        //console.log('.content:', blogComponent)
        //console.log('blogComponent:', blogComponent.debug().length)

        expect(loginComponent.length).toBe(1)         // exists
        expect(blogComponent.debug().length).toBe(0)  // not exists, kind of clever, huh?

      })
    })
  
    describe('when user is logged', () => {
      beforeEach(() => {
        // luo sovellus siten, että käyttäjä on kirjautuneena
      })
  
      it('all blogs are rendered', () => {
        //app.update()
        // ...
      })
    })
  })


describe.only('<Blog />', () => {
    it('clicking contents 1', () => {
        const blog = {
            _id: "123457890",
            title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
            author: 'Jest jäst',
            url: 'url.lru',
            likes: 9
        }

        
        const mockHandler = jest.fn()
      
        const blogComponent = shallow(
          <Blog key={blog._id} blog={blog}  onClick={mockHandler} />
        )
        
        const button = blogComponent.find('.title').hostNodes()
        //console.log('button Component 1:', button.debug())
        button.simulate('click')
        
        let  contentDiv = blogComponent.find('.title')
        expect(contentDiv.text()).toContain(blog.title)

        contentDiv = blogComponent.find('.author')
        console.log('.author:', contentDiv)
//      expect(blogComponent.find('.author')).toBeUndefined()
      
      })
      it('clicking contents 2', () => {
        const blog = {
            _id: "123457890",
            title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
            author: 'Jest jäst',
            url: 'url.lru',
            likes: 9
        }
      
        const mockHandler = jest.fn()
      
        const blogComponent = shallow(
          <Blog key={blog._id} blog={blog}  onClick={mockHandler} />
        )
  
        const button = blogComponent.find('.showDetails').hostNodes()
        //console.log('button Component 2:', button.debug())

        button.simulate('click')
        button.simulate('click')

        let contentDiv = blogComponent.find('.author')
        //console.log('contentDiv:', contentDiv.debug())
        expect(contentDiv.text()).toContain(blog.author)

        contentDiv = blogComponent.find('.url')
        //console.log('contentDiv:', contentDiv.debug())
        expect(contentDiv.text()).toContain(blog.url)

        contentDiv = blogComponent.find('.likes')
        //console.log('contentDiv:', contentDiv.debug())
        expect(contentDiv.text()).toContain(blog.likes)
      })
    
})


describe.only('<SimpleBlog />', () => {
  it('renders title', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Jest jäst',
      likes: 9
    }
    const blogComponent = shallow(<SimpleBlog  blog={blog} />)
   // console.log('blogComponent 1:', blogComponent.debug())

    const contentDiv = blogComponent.find('.title')
   // console.log('contentDiv 1:' , contentDiv.debug())

    expect(contentDiv.text()).toContain(blog.title)

  })

  it('renders author', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Jest jäst',
      likes: 9
    }
    const blogComponent = shallow(<SimpleBlog  blog={blog} />)
    const contentDiv = blogComponent.find('.author')
    expect(contentDiv.text()).toContain(blog.author)
  })

  it('renders likes', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Jest jäst',
      likes: 9
    }
    const blogComponent = shallow(<SimpleBlog  blog={blog} />)
    const contentDiv = blogComponent.find('.likes')
    //console.log('contentDiv 1:' , contentDiv.debug())
    expect(contentDiv.text()).toContain('9')
  })


  it('clicking the likes calls event handler twice', () => {
    const blog = {
        title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
        author: 'Jest jäst',
        likes: 9
    }
  
    const mockHandler = jest.fn()
  
    const blogComponent = shallow(
      <SimpleBlog  blog={blog}  onClick={mockHandler} />
    )
  
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })

})
