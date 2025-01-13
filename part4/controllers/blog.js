import express from 'express'
import Blog from '../models/blog.js'

const blogRouter = express.Router()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  })
  
  blogRouter.post('/', async (request, response, next) => {
    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ?? 0,
    }
    
    const newBlog = new Blog(blog)
    try {
    const result = await newBlog.save()
    response.status(201).json(result)
    } catch(error){
      next(error)
    }
  })



  blogRouter.delete('/:id', async (request, response, next) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(request.params.id);
  
      if (!deletedBlog) {
        throw new Error('Blog not found');
      }
  
      console.log('Deleted blog:', deletedBlog.title);
  
      response
        .status(204)
        .send(`${deletedBlog.title} was successfully deleted`)
        .end();
    } catch (error) {
      next(error); 
    }
  });
  
  
  blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ?? 0,
    } 

    try{
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
      
      if (!updatedBlog) {
        throw new Error('Blog not found');
      }


      response.json(updatedBlog)
    } catch(error) {
      next(error)
    }
    
  })

  export default blogRouter