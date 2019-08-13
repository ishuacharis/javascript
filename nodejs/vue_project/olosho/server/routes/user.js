/* eslint-disable camelcase */
var express = require('express')
var router = express.Router()
const utils = require('../utils/utils')
const UserControllers = require('../controllers/UserControllers')


router.get('/', function (req, resp, next) {
  resp.send('i got here')
}) 

router.patch('/:userid/bio', UserControllers.updateBio)
router.patch('/:userid/body', UserControllers.updateBody)
router.patch('/:userid/change_password', UserControllers.updatePassword)
router.patch('/:userid/phone', UserControllers.updatePhone)
router.patch('/:userid/services', UserControllers.updateServices)
router.patch('/:userid/rates', UserControllers.updateRates)
router.patch('/:userid/upload', utils.upload.array('photos', 10), UserControllers.uploadPhotos)
router.patch('/:userid/upload_avatar', utils.uploadAvatar.single('avatar') ,UserControllers.uploadAvatar)
module.exports = router
