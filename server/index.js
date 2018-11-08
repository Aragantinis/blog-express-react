const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const rateLimit = require('express-rate-limit')

require('dotenv').config()

const app = express()
const port = process.env.SERVER_PORT || 3000

var winston = require('./config/winston')

var indexRouter = require('./routes/index')
var postsRouter = require('./routes/posts')
var commentsRouter = require('./routes/comments')
var authorsRouter = require('./routes/authors')

const init = async () => {
  try {
    const mongo = await mongoose.connect(
      'mongodb://localhost/blog',
      { useNewUrlParser: true }
    )

    console.log('MongoDB connected successfully.')

    const apiLimiter = rateLimit({
      windowMs: 60 * 60 * 1000, // 15 minutes
      max: 5000,
      message: 'Too many requests from this IP, please try again after an hour',
    })
    app.use(apiLimiter)

    app.use(bodyParser.json({ type: 'application/json' }))
    // app.use(bodyParser.urlencoded())
    app.use(morgan('combined', { stream: winston.stream }))

    app.use('/', indexRouter)
    app.use('/posts', postsRouter)
    app.use('/comments', commentsRouter)
    app.use('/authors', authorsRouter)

    await app.listen(port)

    console.log(`Server is running on port ${port}.`)
  } catch (e) {
    console.error(e)
  }
}

init()
