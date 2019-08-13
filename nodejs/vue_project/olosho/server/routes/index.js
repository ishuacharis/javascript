var express = require('express')
var router = express.Router()
const fs = require('fs')
const path = require('path')
router.get('/', function (req, resp, next) {
  const filen = __filename
  const public = '/public/uploads'
  const avatarFolder = 'public/uploads/avatar/pics'
  let created = false
  if (!fs.existsSync(avatarFolder)) {
    fs.mkdirSync(avatarFolder)
    created = true
  }
  resp.status(200).send({
    'directory': __dirname,
    'file': filen,
    'base': path.basename(__filename),
    'dir': path.dirname(__filename),
    'ext': path.basename(__filename),
    'join_path': path.join(__dirname,public),
    'resolved_path': path.resolve(path.join(__dirname, public)),
    'created': created
  })
})
module.exports = router
