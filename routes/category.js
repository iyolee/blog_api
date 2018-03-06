const express = require('express')

const CategoryControl = require('../controllers/v1/category')

const router = express.Router()

router.post('/category', CategoryControl.addCategory)
router.put('/category', CategoryControl.editCategory)
router.get('/category', CategoryControl.readCategory)
router.delete('/category/:id', CategoryControl.deleteCategory)

module.exports = router