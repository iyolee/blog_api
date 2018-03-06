const blog = require('./blog')
const category = require('./category')
const user = require('./user')

module.exports = app => {
  app.use('/v1', blog)
  app.use('/v1', category)
  app.use('/v1', user)
}