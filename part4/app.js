import express from 'express'
import cors from 'cors'
import blogRouter from './controllers/blog.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import middleware from './utils/middleware.js'
import logger from './utils/logger.js'
import config from './utils/config.js'
import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })


const app = express()
app.use(cors())
app.use(express.json())


app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)

app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)

app.use(middleware.errorHandler)





export default app