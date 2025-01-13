import express from 'express'
import cors from 'cors'
import blogRouter from './controllers/blog.js'
import errorHandler from './utils/middleware.js'




const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

app.use(errorHandler)





export default app