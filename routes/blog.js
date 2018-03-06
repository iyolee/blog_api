const express = require('express')

const BlogControl = require('../controllers/v1/blog')

const router = express.Router()

router.post('/blog', BlogControl.addPost)
router.get('/blog', BlogControl.getAllPosts)
router.put('/blog/:id', BlogControl.editPost)
router.delete('/blog/:id', BlogControl.deletePost)
router.get('/blog/count', BlogControl.getAllPostsCount)
router.get('/blog/index', BlogControl.getPostsByPage)

module.exports = router