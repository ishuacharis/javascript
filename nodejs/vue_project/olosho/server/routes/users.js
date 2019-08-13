var express = require('express')
var router = express.Router()
const UsersController = require('../controllers/UsersControllers')

router.get('/', UsersController.fetchUsers)
module.exports = router
