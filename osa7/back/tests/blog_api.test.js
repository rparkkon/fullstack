const supertest = require('supertest')
const { app, server } = require('../index')
const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')
const api = supertest(app)

/*
beforeAll(async () => {
  await Blogs.remove({})

  let noteObject = new Note(initialNotes[0])
  await noteObject.save()

  noteObject = new Note(initialNotes[1])
  await noteObject.save()
})
*/

/*
describe.skip('blogs in db', () => {
  test('blogs in db', () => {
    const blogs = await testHelper.blogsInDb()
    console.log("blogs: ", blogs)
    expect(blogs).toBeDefined()
  })
})
*/

describe('list helper', () => {

  let blogs
  test('there are 20 blogs', async () => {
    response = await api
      .get('/api/blogs')

      blogs = response.body
//      console.log('blogs:', blogs) 
    })

    test('favorite blog ', () => {
      const result = listHelper.favoriteBlog(blogs)
      console.log("favorite: ", result)
      expect(result).toBeDefined()
    })

    test('most blog ', () => {
      const result = listHelper.mostBlogs(blogs)
      console.log("most blogs: ", result)
      expect(result).toBeDefined()
    })

    test('most Likes ', () => {
      const result = listHelper.mostLikes(blogs)
      console.log("most likes: ", result)
      expect(result).toBeDefined()
    })

    afterAll(() => {
      server.close()
    })
  
})

describe('a non valid user', () => {
  test('user not unique', async () => {
    const newUser = {
      username: "chan",
        name: "Matti Tuunanen",
        passwordHash: "passs"
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(409)

    const response = await api
    .get('/api/users')
    
//    console.log('response.body:', response.body)

    const contents = response.body.map(r => r.username)
    console.log('contents:', contents)

    expect(contents).toContain(newUser.username)
})
test('user password to short', async () => {
  const newUser = {
    username: "matXXXXtita",
      name: "Matti Tuunanen",
      passwordHash: "pa"
  }

  await api
  .post('/api/users')
  .send(newUser)
  .expect(409)

  const response = await api
  .get('/api/users')
  
  //console.log('user password response.body:', response.body)

  let contents = response.body.map(r => r.username)
  contents = contents.filter(r => r == newUser.username)
  console.log('user password contents', contents, ' len: ', contents.length)

  expect(contents).toHaveLength(0)
})

afterAll(() => {
    server.close()
  })
})

describe('blogs returned', () => {

    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('there are 20 blogs', async () => {
      const response = await api
        .get('/api/blogs')

      console.log('response.body.length:',  response.body.length) 

      expect(response.body.length).toBe(20)
    })

  afterAll(() => {
    server.close()
  })

})
  
describe('first blog', () => {
    test('the first note is aboutTekemisen taito', async () => {
    const response = await api
      .get('/api/blogs')
  
    expect(response.body[0].title).toBe('Tekemisen taito')
  })

  afterAll(() => {
    server.close()
  })
})

describe('blog added', () => {
    let blogsBefore = 26

    beforeAll(async () => {
      //test('number of blogs', async () => {
          const response = await api
          .get('/api/blogs')

          blogsBefore = response.body.length;
          console.log('response.body.length BEFORE:', blogsBefore)
          expect(response.body.length).toBe(blogsBefore)
     // })
    })

    test('a valid blog can be added ', async () => {
        const newBlog = {
            title: "Zaaa xx xx ZZ butter butmut zzXXXXz jitterns",
            author: "Matti Tuunanen",
            url: "https://reactpatterns.com/",
            likes: 3
        }
    
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const response = await api
        .get('/api/blogs')
    
        const contents = response.body.map(r => r.title)
        console.log('response.body.length:',  response.body.length, ' BEFORE:', blogsBefore)

        expect(response.body.length).toBe(blogsBefore+1)
        expect(contents).toContain(newBlog.title)
    })
    afterAll(() => {
        server.close()
      })
})

describe.skip('blog added no likes', () => {
    var blogsBefore = 26
    test('blog added no likes', async () => {
        const newBlog = {
            title: "NzxyzN butter butmut jitterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
        }
    
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const response = await api
        .get('/api/blogs')
    
       const contents = response.body.map(r => [r.title, r.likes]).filter(r => r[0] === newBlog.title);

        console.log('response.body.contents:',  contents)

        expect(contents[0][1]).toBe(0)
    })
    afterAll(() => {
        server.close()
      })
})

describe('blog no title', () => {
    test(' blog no title', async () => {
        const newBlog = {
            title: "",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
        }
    
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
        const response = await api
        .get('/api/blogs')
    
       const contents = response.body.map(r => [r.title, r.url]).filter(r => r[0] === newBlog.title);

        console.log('response.body.contents:',  contents)

        expect(contents).toEqual([])
    })
    afterAll(() => {
        server.close()
      })
})

  /*
  test('blog without content is not added ', async () => {
    const newNote = {
      important: true
    }
  
    const initialNotes = await api
      .get('/api/notes')
  
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
  
    const response = await api
      .get('/api/notes')
  
    expect(response.body.length).toBe(initialNotes.length)
  })
  */