const multer = require('multer')
const sharp = require('sharp')

const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = './public/uploads/' + req.params.userid + '/'
    file.path = path
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }
    cb(null, path)
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
})

const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let rootFolder = './public/uploads/' + req.params.userid + '/'
    if (!fs.existsSync(rootFolder)) {
      fs.mkdirSync(rootFolder)
    }
    let path = './public/uploads/' + req.params.userid + '/avatar'
    file.path = path
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    } 
    cb(null, path)
    
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
})

function checkFileType (file, cb) {
  const filetypes = /jpeg|jpg|png/
  const ext = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  if (mimetype && ext) {
    cb(null, true)
  } else {
    const error = new Error('Images only')
    error.code = 'LIMIT_FILE_TYPES'
    return cb(error, false)
  }
}

let sharpResize = (req, resp, next) => {
  console.log('sharp activated')
  let iPath = path.resolve(path.join(__dirname, '/public/uploads/' + req.params.userid))
  let savePath = path.resolve(path.join(__dirname, '/public/uploads/' + req.params.userid + '/resized/'))

  let width = 500
  let height = 500

  sharp(iPath)
    .resize(width, height)
    .toFile(savePath, function (err) {
      if (!err) {
        console.log('sharp worked')
      } else {
        console.log('sharp did not work')
      }
    })
}
let avatarResize = (req, resp, next) => {
  console.log('profile picture to be resized')
  let savePath = path.resolve(path.join(__dirname, '/public/uploads/', req.params.userid, + '/avatar'))

  let width = 500
  let height = 500

  sharp(iPath)
    .resize(width, height)
    .toFile(savePath, function (err) {
      if (!err) {
        console.log('avatar resized')
      } else {
        console.log('avatar not resized')
      }
    })
}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
})
const uploadAvatar = multer({
  storage: avatarStorage,
  limits: {
    fileSize: 1024 * 1024 * 20
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb)
  }
})
module.exports = {
  upload,
  uploadAvatar,
  sharpResize,
  avatarResize
}
