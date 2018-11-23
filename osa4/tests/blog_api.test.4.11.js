const supertest = require('supertest')
const { app, server } = require('../bck/index')
const listHelper = require('../bck/utils/list_helper')
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
    test('the first note is aboutTekemisen taito"', async () => {
    const response = await api
      .get('/api/blogs')
  
    expect(response.body[0].title).toBe('Tekemisen taito')
  })

  afterAll(() => {
    server.close()
  })
})

describe('blog added', () => {
    var blogsBefore = 26
    test('a valid blog can be added ', async () => {
        const newBlpcvk = {
            title: "butter butmut jitterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 4
        }
    
        beforeAll(async () => {
            test('number of blogs', async () => {
                const response = await api
                .get('/api/blogs')

                blogsBefore = response.body.length;
                console.log('response.body.length BEFORE:', blogsBefore)
                expect(response.body.length).toBe(blogsBefore)
            })
        })

        await api
        .post('/api/blogs')
        .send(newBlpcvk)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const response = await api
        .get('/api/blogs')
    
        const contents = response.body.map(r => r.title)
        console.log('response.body.length:',  response.body.length, ' BEFORE:', blogsBefore)

        expect(response.body.length).toBe(blogsBefore+1)
        expect(contents).toContain('butter butmut jitterns')
    })
    afterAll(() => {
        server.close()
      })
})

describe('blog added no likes', () => {
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