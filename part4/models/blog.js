import mongoose from 'mongoose'
import config from '../utils/config.js'


const url = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.NODE_ENV === 'development' ? process.env.DEV_MONGODB_URI : process.env.MONGODB_URI



mongoose.set('strictQuery',false)

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })


  const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      unique: true
    },
    author: {
      type: String,
      required: true,
      unique: false
    },
    url: String,
    likes: Number
  })

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


export default mongoose.model('Blog', blogSchema, 'posts')