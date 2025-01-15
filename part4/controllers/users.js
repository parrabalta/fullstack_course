import bcrypt from 'bcrypt'
import express from 'express'
import User from '../models/user.js'


const usersRouter = express.Router()

usersRouter.get('/', async (request, response, next) => {
    const users = await User.find({}).populate('blogs', { title: 1})
    response.json(users)

})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (password.length < 3) {
    return response.status(400).json({ error: `User validation failed: username: Path password is shorter than the minimum allowed length (3)` })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  try{
  const savedUser = await user.save()
  response.status(201).json(savedUser)
  } catch(error){
    next(error)
  }
})

export default usersRouter