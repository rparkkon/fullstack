const logger = (request, response, next) => {
  if (process.env.NODE_ENV === 'test') {
    return next()
  }

  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request) => {
  let token
  let decodedToken
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)
    if (token) {
      decodedToken = jwt.verify(token, process.env.SECRET)
    }
  }
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }    
  return request.token = token
}

module.exports = {
  logger,
  error,
  tokenExtractor
}