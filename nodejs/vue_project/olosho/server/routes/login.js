var express = require('express')
var router = express.Router()
const AuthenticationControllers = require('../controllers/AuthenticationControllers')
const AuthenticationControllerPolicy = require('../policies/AuthenticatonControllerPolicy')
router.post('/', AuthenticationControllerPolicy.validate('login'), AuthenticationControllers.login)
module.exports = router
