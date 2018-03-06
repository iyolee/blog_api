const Blog = require('../../models/blog')

const responseData = {
  code: 0,
  message: ''
}

class BlogControl {
  constructor() {}

  // 添加文章
  addPost(req, res) {
    const content = req.body.content || ''
    const category = req.body.category || ''
    if (content === '' || category === '') {
      responseData.code = '1'
      responseData.message = '博客内容或者分类不能为空'
      res.json(responseData)
      return
    }
    const blog = new Blog(req.body)
    blog
      .save()
      .then(rs => {
        if (rs) {
          responseData.message = '发表成功'
          res.status(200).json(responseData)
        }
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }

  // 获取全部文章
  getAllPosts(req, res) {
    Blog.find({}, { __v: 0 })
      .populate('category', 'name')
      .then(rs => {
        res.json(rs)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }

  // 修改文章
  editPost(req, res) {
    const id = req.params.id || ''
    Blog.findById(id)
      .then(rs => {
        rs.author = req.body.author || rs.author
        rs.title = req.body.title || rs.title
        rs.content = req.body.content || rs.conent
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

  // 删除文章
  deletePost(req, res) {
    const id = req.params.id || ''
    Blog.findByIdAndRemove(id)
      .then(success => {
        responseData.message = '删除成功'
        responseData.id = success.id
        res.json(responseData)
      })
      .catch(err => {
        if (err) {
          responseData.code = '1'
          responseData.message = '删除失败'
          res.status(500).json(responseData)
        }
      })
  }

  // 获取文章总数
  getAllPostsCount(req, res) {
    Blog.count()
      .then(num => {
        const allPostsCount = {}
        allPostsCount['count'] = num
        res.status(200).json(allPostsCount)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }

  // 分页查询
  getPostsByPage(req, res) {
    let limit, page, skip, totalPage
    if (req.query.page) {
      page = Number(req.query.page)
    } else {
      // 默认第一页
      page = 1
    }
    if (req.query.limit) {
      limit = Number(req.query.limit)
    } else {
      // 默认每页10条
      limit = 10
    }
    Blog.count()
      .then(num => {
        totalPage = Math.ceil(num / limit)
        page = Math.min(page, totalPage)
        page = Math.max(1, page)
        skip = (page - 1) * limit
        Blog.find()
          .sort({ _id: -1 })
          .limit(limit)
          .skip(skip)
          .then(rs => {
            res.json(rs)
          })
      })
      .catch(err => {
        res.status(500).send(err)
      })
  }
}

module.exports = new BlogControl()
