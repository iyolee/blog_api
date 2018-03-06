const crypto = require('crypto')

module.exports = password => {
  const md5 = crypto.createHash('md5')
  const md5password = md5.update(password).digest('base64')
  return md5password
}