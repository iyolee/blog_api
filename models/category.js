const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: String,
    default: '默认分类'
  }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
