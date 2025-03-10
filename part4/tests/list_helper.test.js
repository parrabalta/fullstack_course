import test, { describe } from 'node:test'
import assert from 'node:assert'
import listHelper from '../utils/list_helper.js'

const blogs = [
  {
    id:'5a422a851b54a676234d17f7',
    title:'React patterns',
    author:'Michael Chan',
    url:'https://reactpatterns.com/',
    likes:7
  },
  {
    id:'5a422aa71b54a676234d17f8',
    title:'Go To Statement Considered Harmful',
    author:'Edsger W. Dijkstra',
    url:'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes:5
  },
  {
    id:'5a422b3a1b54a676234d17f9',
    title:'Canonical string reduction',
    author:'Edsger W. Dijkstra',
    url:'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes:12
  },
  {
    id:'5a422b891b54a676234d17fa',
    title:'First class tests',
    author:'Robert C. Martin',
    url:'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes:10
  },
  {
    id:'5a422ba71b54a676234d17fb',
    title:'TDD harms architecture',
    author:'Robert C. Martin',
    url:'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes:0
  },
  {
    id:'5a422bc61b54a676234d17fc',
    title:'Type wars',
    author:'Robert C. Martin',
    url:'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes:2
  }
]

describe('totalLikes', () => {
  test('of empty list is zero', () => {
    const resultEmptyBlogList = listHelper.totalLikes([])
    assert.strictEqual(0,resultEmptyBlogList)
  })
  test('of the whole list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
  test('of only one blog',() => {
    const blog = blogs[0]
    assert.strictEqual(listHelper.totalLikes([blog]),blog.likes)
  })

})

describe('favoriteBlog', () => {
  test('of the whole list is calculated right', () => {
    assert.deepStrictEqual({
      title:'Canonical string reduction',
      author:'Edsger W. Dijkstra',
      likes:12
    }, listHelper.favoriteBlog(blogs))
  })
  test('of an empty array', () => {
    assert.deepStrictEqual({}, listHelper.favoriteBlog([]))
  })
})