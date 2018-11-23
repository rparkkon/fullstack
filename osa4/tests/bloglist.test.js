const listHelper = require('../bck/utils/list_helper')


test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

/*
test('totalLikes is called', () => {
    const blogs = []
  
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(1)
  })
*/

const listWithOneBlog = [
    {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
    }
]

const blogs = [
    {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
    },
    {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
    },
    {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
    },
    {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
    },
    {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
    },
    {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
    }  
]


describe('total likes', () => {
    test('total blog likes ', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favorite Blog', () => {
    test('favorite blog ', () => {
    const result = listHelper.favoriteBlog(blogs)
    console.log("Favorite: ", result)
    expect(result).toBeDefined()
    })
})

describe('most Blogs', () => {
    test('most blog ', () => {
    const result = listHelper.mostBlogs(blogs)
    console.log("most blogs: ", result)
    expect(result).toBeDefined()
    })
})

describe('most Likes', () => {
    test('most Likes ', () => {
    const result = listHelper.mostLikes(blogs)
    console.log("most likes: ", result)
    expect(result).toBeDefined()
    })
})
