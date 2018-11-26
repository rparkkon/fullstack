const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
  
usersRouter.get('/', async (request, response) => {
  //    console.log('blogsRouter.get: ', request.route)    
  try {
    const users = await User.find({})
                            .populate('Blog', {title: 1, author: 1, url:1, likes: 1})

//    console.log('blogsRouter.get async: ', users)    
    response.json(users.map(User.format))
    
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }    
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
//    console.log('usersRouter.post: ', request.body)    

    if (body.passwordHash.length < 4) {
        response.status(409).json({ error: 'Password too short, must be longer than 3 chars ' })
        return
    }

    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHash = bcrypt.hashSync(body.passwordHash, salt);
    
    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult === undefined ? true : body.adult,
      passwordHash
    })

    const foundUser = await User.find({username: user.username})
    //console.log('usersRouter.userInDb: ', foundUser)    

    if (foundUser.length === 0) {
        const savedUser = await user.save()
        response.json(savedUser)
    } 
    else {
        response.status(409).json({ error: 'Username already exists' })
    }

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter