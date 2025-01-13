import { test, after, describe, beforeEach } from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blog.js'
import assert from 'node:assert'



const initialBlogs = [
    {
        "title": "primer blog",
        "author": "balta",
        "url": "primero.com",
        "likes": 12
    },
    {
        "title": "segundo blog",
        "author": "balta",
        "url": "segundo.com",
        "likes": 15
    }
  ]

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })


describe('get api/blogs testing', async () => {
    
test('blog are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('returns correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)
  })

test('The unique identifier property of the blog posts is id', async () => {
    const blogs = await Blog.find({})
    const blogToCheck = blogs[0].toJSON()
    assert(Object.keys(blogToCheck).includes('id'))
  })

})


describe('post api/blogs testing', async () => {
    
  test('number of blogs in the system is increased by one', async () => {
    const newBlog = {
      "title": "new blog posted",
      "author": "pipa",
      "url": "primero.com",
      "likes": 12
  }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await Blog.find({})

    const titles = response.map(r => r.title)
    const authors = response.map(r => r.author)

    assert.strictEqual(response.length, initialBlogs.length + 1)
    assert(titles.includes('new blog posted'))
    assert(authors.includes('pipa'))

  })
  
  test('if likes property is missing, set value 0', async () => {
    const newBlog = {
      "title": "likes property is missing",
      "author": "pipa",
      "url": "primero.com"
  }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      
      const response = await Blog.find({})
      const result = response.filter(blog => blog.title === 'likes property is missing')
      assert.strictEqual(result[0].likes, 0)
    })

    test('returns 400 when sending null title/author', async () => {
      const newBlog = {
        "author": "pipa",
        "url": "primero.com"
    }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
      
      })
  

  
  })


  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await Blog.find({})
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await Blog.find({})

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

      const titles = blogsAtEnd.map(r => r.title)
      assert(!titles.includes(blogToDelete.title))
    })
  })


  describe('Update a blog', () => {
  
    test('Blog update successful ', async () => {
  
      const newBlog = {
        title:"update testing",
        author:"pipa",
        url:"pipa.com",
        likes:15
      }
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
  
      const blogs = await Blog.find({})
      const blogToUpdate = blogs.find(blog => blog.title === newBlog.title).toJSON()
      
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }
  
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await Blog.find({})

      const foundBlog = blogsAtEnd.find(blog => blog.title === updatedBlog.title)
      assert.strictEqual(foundBlog.likes, newBlog.likes + 1)
    })
  })

after(async () => {
  await mongoose.connection.close()
})