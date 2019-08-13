var User = require('../db/models/user')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
module.exports = {
  async updateBio (req, resp, next) {
    const id = req.params.userid
    const username = req.body.username
    const email = req.body.email
    const ethnicity = req.body.ethnicity
    const orientation = req.body.orientation
    const bio = req.body.bio
    if (!username || !email || !ethnicity || !orientation || !bio) {
      return resp.json({
        success: false,
        message: 'Provide the necessary credentials'
      })
    } else {
      const updateOps = {
        username: username,
        email: email,
        ethnicity: ethnicity,
        orientation: orientation,
        about: bio
      }
      await User.findOneAndUpdate({
          _id: id
        }, {
          $set: updateOps
        }, {
          new: true, useFindAndModify: false
        },
        function (err, docs) {
          if (err) {
            return resp.status(500).json({
              success: false,
              message: 'Internal Server error'
            })
          }
          if (docs) {
            resp.status(200).json({
              success: true,
              user: docs
            })
          }
        }
      )
    }
  },
  updateBody (req, resp, next) {
    const id = req.params.userid
    const height = req.body.height
    const weight = req.body.weight
    const hairColor = req.body.hair_color
    const skinColor = req.body.skin_color
    const pierce = req.body.pierce
    const tatoo = req.body.tatoo
    const smoke = req.body.smoke
    const drink = req.body.drink
    if (!height || !weight || !hairColor || !skinColor) {
      return resp.json({
        success: false,
        message: 'Provide the necessary credentials'
      })
    } else {
      const updateOps = {
        height: height,
        weight: weight,
        hair_color: hairColor,
        skin_color: skinColor,
        piercing: pierce,
        tatoo: tatoo,
        smoke: smoke,
        drink: drink
      }
      User.findOneAndUpdate({
        _id: id
      }, {
        $set: updateOps
      }, {
        new: true, useFindAndModify: false
      },
      function (err, docs) {
        if (err) {
          return resp.status(500).json({
            success: false,
            message: 'Internal Server error'
          })
        }
        if (docs) {
          resp.status(200).json({
            success: true,
            user: docs
          })
        }
      }
      )
    }
  },
  updatePassword (req, resp, next) {
    const id = req.params.userid
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    if (!oldPassword || !newPassword) {
      resp.status(201).json({
        success: false,
        message: 'Provide the necessary credentials'
      })
    } else {
      User.findById({
        _id: id
      }, function (err, user) {
        if (err) {
          console.log(err)
          return
        }
        user.comparePassword(oldPassword, function (err, isMatch) {
          if (!isMatch || err) {
            resp.json({
              success: false,
              user: user,
              message: 'Authentication failed. Wrong password.'
            })
          } else {
            user.password = newPassword
            user.save(function (err) {
              if (err) {
                console.log(err)
                return
              }
              console.log(user.password)
              resp.status(200).json({
                success: true,
                user: user,
                message: 'password change successfully'
              })
            })
          }
        })
      })
    }
  },
  updatePhone (req, resp, next) {
    const id = req.params.userid
    const phone = req.body.phone
    if (!phone) {
      resp.status(201).json({
        success: false,
        message: 'Provide the necessary credentials'
      })
    } else {
      const updateOps = {
        phone: phone
      }
      User.findOneAndUpdate({
        _id: id
      }, {
        $set: updateOps
      }, {
        new: true,
        useFindAndModify: false
      },
      function (err, docs) {
        if (err) {
          return resp.status(500).json({
            success: false,
            message: 'Internal Server error'
          })
        }
        if (docs) {
          resp.status(200).json({
            success: true,
            user: docs
          })
        }
      }
      )
    }
  },
  updateServices (req, resp, next) {
    const id = req.params.userid
    const services = req.body.services
    if (!services) {
      resp.status(201).json({
        success: false,
        message: 'Provide the necessary credentials'
      })
    } else {
      const updateOps = {
        services: services
      }
      User.findOneAndUpdate({
        _id: id
      }, {
        $set: updateOps
      }, {
        new: true, useFindAndModify: false
      },
      function (err, docs) {
        if (err) {
          return resp.status(500).json({
            success: false,
            message: 'Internal Server error'
          })
        }
        if (docs) {
          resp.status(200).json({
            success: true,
            user: docs
          })
        }
      }
      )
    }
  },
  updateRates (req, resp, next) {
    const id = req.params.userid
    const incalls = req.body.incalls
    const outcalls = req.body.outcalls
    if (!incalls || !outcalls) {
      return resp.json({
        success: false,
        message: 'Provide the necessary credentials'
      })
    } else {
      const updateOps = {
        incall: incalls,
        outcall: outcalls
      }
      User.findOneAndUpdate({
        _id: id
      }, {
        $set: updateOps
      }, {
        new: true, useFindAndModify: false
      },
      function (err, docs) {
        if (err) {
          return resp.status(500).json({
            success: false,
            message: 'Internal Server error'
          })
        }
        if (docs) {
          resp.status(200).json({
            success: true,
            user: docs
          })
        }
      }
      )
    }
  },
  uploadPhotos (req, resp, next) {
    const id = req.params.userid
    const photos = req.files
    if (!photos.length) {
      resp.status(201).json({
        success: false,
        message: 'No files selected'
      })
    } else {
      for (let index = 0; index < photos.length; index++) {
        const element = photos[index]
        let savePath = path.join(__dirname, '../public/uploads/' + req.params.userid 
              + '/resized_' + element.filename)
        let width = 500
        let height = 500

        sharp(element.path)
          .resize(width, height)
          .toFile(savePath, function (err) {
            if (!err) {
              console.log('sharp worked')
            } else {
              console.log(err)
            }
          })
      }

      let filenames = Array.from(photos).map(x => {
        return id + '/resized_' + x.filename
        // return id + '/' + x.filename
      })
      const updateOps = {
        photos: filenames
      }
      User.findOneAndUpdate({
        _id: id
      }, {
        $push: updateOps
      }, {
        new: true, useFindAndModify: false
      },
      function (err, docs) {
        if (err) {
          return resp.status(500).json({
            success: false,
            message: 'Internal Server error'
          })
        }
        if (docs) {
          resp.status(200).json({
            success: true,
            user: docs,
            message: 'Updated successfully'
          })
        }
      })
    }
  },
  uploadAvatar(req, resp, next){
    const id = req.params.userid
    const photo = req.file
    if (!photo) {
      resp.status(201).send({
        success: false,
        message: 'No File Selected'
      })
    } else {
      
      let savePath = path.join(__dirname, '../public/uploads/' + id + '/avatar/profile_' + photo.filename)
      let width = 200
      let height = 200
      sharp(photo.path)
        .resize(width, height)
        .toFile(savePath, function (err) {
          if (!err) {
            fs.unlinkSync(photo.path)
            console.log('avatar uploaded')
          } else {
            console.log(err)
          }
        })
        const updateOps = {
          profile_url: 'profile_' + photo.filename
        }
        User.findOneAndUpdate({
              _id: id
            }, {
              $set: updateOps
            }, {
              new: true,
              useFindAndModify: false
            },
            function (err, docs) {
              if (err) {
                return resp.status(500).json({
                  success: false,
                  message: 'Internal Server error'
                })
              }
              if (docs) {
                resp.status(200).json({
                  success: true,
                  user: docs,
                  message: 'Updated successfully'
                })
              }
          })
    }
  }
}

/* 
const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
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
}) */