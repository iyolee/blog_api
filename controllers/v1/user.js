const User = require('../../models/user')
const md5 = require('../../lib/md5')

const responseData = {
  code: 0,
  message: ''
}

class UserControl {
  constructor() {}

  addUser(req, res) {
    const username = req.body.username
    const password = req.body.password
    const repassword = req.body.repassword
    const _password = md5(md5(password) + 'leeper')
    
    if (username === '' || password === '') {
      responseData.code = 1
      username === ''
        ? (responseData.message = '用户名不能为空')
        : (responseData.message = '密码不能为空')
      res.json(responseData)
      return
    }

    if (password !== repassword) {
      responseData.code = 1
      responseData.message = '两次密码不一样'
      res.json(responseData)
      return
    }

    User.findOne({username: username})
      .then(userInfo => {
        if (userInfo) {
          responseData.code = 2
          responseData.message = '用户名已经存在'
          res.json(responseData)
          return
        }

        const user = new User({username: username, password: _password})
        user.save()
          .then(rs => {
            const username = rs.username
            // responseData.message = '注册成功'
            res.json(username)
          })
      })
      .catch(err => res.status(500).json(err))
  }

  readUser(req, res) {
    const username = req.body.username || ''
    const password = req.body.password || ''
    const _password = md5(md5(password) + 'leeper')

    if (username === '' || password === '') {
      responseData.code = 1
      username === ''
        ? (responseData.message = '用户名不能为空')
        : (responseData.message = '密码不能为空')
      res.json(responseData)
      return
    }

    User.findOne({username: username})
      .then(userInfo => {
        if (userInfo === null) {
          responseData.code = 2
          responseData.message = '用户不存在'
          res.json(responseData)
          return
        }

        if (_password !== userInfo.password) {
          responseData.code = 2
          responseData.message = '密码错误'
          res.json(responseData)
          return
        }
        res.json(userInfo.username)
      })
  }
}

module.exports = new UserControl()