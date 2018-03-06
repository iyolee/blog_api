const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
  title: {
    type: String,
    default: '文章标题'
  },
  author: {
    type: String,
    default: 'admin'
  },
  time: {
    type: String,
    default: new Date().toLocaleString()
  },
  views: {
    type: Number,
    default: 0
  },
  content: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
