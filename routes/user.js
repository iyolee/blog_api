const express = require('express')

const UserControl = require('../controllers/v1/user')

const router = express.Router()

router.post('/admin/register', UserControl.addUser)
router.post('/admin', UserControl.readUser)


module.exports = router