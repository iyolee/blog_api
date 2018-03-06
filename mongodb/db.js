const mongoose = require('mongoose')
const config = require('../config/config')

mongoose.Promise = global.Promise

const dbConnect = mongoose.connect(
  config.url,
  { useMongoClient: true },
  err => {
    if (err) {
      console.log('数据库连接失败')
    } else {
      console.log('数据库连接成功')
    }
  }
)

module.exports = dbConnect