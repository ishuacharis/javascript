var express = require('express')
var router = express.Router()
const AuthenticationController = require('../controllers/AuthenticationControllers')
const AuthenticationControllerPolicy = require('../policies/AuthenticatonControllerPolicy')

router.post('/', AuthenticationControllerPolicy.validate('register'), AuthenticationController.register)

module.exports = router
