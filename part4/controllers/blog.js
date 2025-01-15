import express from 'express'
import Blog from '../models/blog.js'
import User from '../models/user.js'
import middleware from '../utils/middleware.js'

const blogRouter = express.Router()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const user = await User.findById(request.user)
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0,
    user: user._id
  }

  const newBlog = new Blog(blog)

  try {
    const result = await newBlog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const blogToDelete = await Blog.findById(request.params.id)
    
    if (!blogToDelete) {
      throw new Error('Blog not found')
    }

    if (request.user !== blogToDelete.user.toString()) {
      return response.status(403).json({ error: 'You do not have permission to delete this blog' })
    }

    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
    response.status(204).send(`${deletedBlog.title} was successfully deleted`).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const blogToUpdate = await Blog.findById(request.params.id)
    
    if (!blogToUpdate) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    if (request.user !== blogToUpdate.user.toString()) {
      return response.status(403).json({ error: 'You do not have permission to update this blog' })
    }

    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ?? 0,
      user: blogToUpdate.user.toString()
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

export default blogRouter
