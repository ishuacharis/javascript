var express = require('express')
var router = express.Router()
const AuthenticationControllers = require('../controllers/AuthenticationControllers')
const AuthenticationControllerPolicy = require('../policies/AuthenticatonControllerPolicy')

router.post('/login', AuthenticationControllerPolicy.validate('login'), AuthenticationControllers.login)
router.post('/register', AuthenticationControllerPolicy.validate('register'), AuthenticationControllers.register)
module.exports = router
