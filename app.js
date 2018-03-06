const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config/config')
const dbConnect = require('./mongodb/db')
const router = require('./routes/index')
const logger = require('./middlewares/logs/logger')

const app = express()

// 数据库连接
dbConnect

// bodyparse 设置
app.use(bodyParser.urlencoded({ extended: true }))

// 日志
app.use(logger)

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  )
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true) //可以带cookies
  res.header('X-Powered-By', '3.2.1')
  if (req.method == 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

// 路由
router(app)

app.listen(config.port, config.ip)
