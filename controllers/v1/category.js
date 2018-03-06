const Category = require('../../models/category')

const responseData = {
  code: 0,
  message: ''
}

class CategoryControl {
  constructor() {}

  addCategory(req, res) {
    const name = req.body.name || ''
    if (name === '') {
      responseData.code = '1'
      responseData.message = '分类内容不能为空'
      res.json(responseData)
      return
    }
    Category.findOne({ name: name })
      .then(rs => {
        if (rs) {
          responseData.message = '该分类已存在'
          res.json(responseData)
          return
        }
        const category = new Category(req.body)
        category
          .save()
          .then(rs => {
            if (rs) {
              responseData.message = '添加成功'
              res.status(200).json(responseData)
            }
          })
          .catch(err => {
            res.status(500).send(err)
          })
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }

  editCategory(req, res) {
    const id = req.params.id || ''
    Category.findById(id)
      .then(rs => {
        rs.name = req.body.author || rs.name
        rs.save().then(success => {
          if (success) {
            responseData.message = '修改成功'
            res.status(200).json(responseData)
          }
        })
      })
      .catch(err => {
        if (err) {
          responseData.code = '1'
          responseData.message = '修改失败'
          res.status(500).json(responseData)
        }
      })
  }

  readCategory(req, res) {
    Category.find({}, { __v: 0 })
      .then(rs => {
        res.json(rs)
      })
      .catch(err => {
        if (err) {
          responseData.code = '1'
          responseData.message = '读取失败'
          res.status(500).json(responseData)
        }
      })
  }

  deleteCategory(req, res) {
    const id = req.params.id || ''
    if (id === '') {
      responseData.code = 2
      responseData.message = '不能为空'
      res.json(responseData)
    }
    Category.findByIdAndRemove(id)
      .then(success => {
        if (success) {
          responseData.message = '修改成功'
          res.status(200).json(responseData)
        } else {
          responseData.code = 1
          responseData.message = '数据库不存在该分类'
          res.status(500).json(responseData)
        }
      })
      .catch(err => {
        if (err) {
          responseData.code = 1
          responseData.message = '删除失败'
          res.status(500).json(responseData)
        }
      })
  }
}

module.exports = new CategoryControl()
