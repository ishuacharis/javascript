var passport = require('passport')
var User = require('../db/models/user')
var settings = require('../config/settings')
require('../config/passport')(passport)
var jwt = require('jsonwebtoken')

const validationHandler = next => result => {
  if (result.isEmpty()) return
  if (!next) {
    throw new Error(result.array().map(i => `${i.msg}`).join(' '))
  } else {
    return next(new Error(result.array().map(i => `'${i.param}' has ${i.msg}`).join('')))
  }
}
let token = function (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user.toJSON(), settings.secret, {
    expiresIn: ONE_WEEK
  })
}
module.exports = {
  async login (req, resp, next) {
    await req.getValidationResult()
      .then(validationHandler())
      .then(() => {
        const { username, password } = req.body
        User.findOne({
          username: username
        }, function (err, user) {
          if (err) throw err

          if (!user) {
            resp.status(403).send({
              success: false,
              error: 'Authentication failed. User not found.'
            })
          } else {
          // check if password matches
             user.comparePassword(password, function (err, isMatch) {
              if (isMatch && !err) {
              // if user is found and password is right create a token
                jwt.verify(token(user), settings.secret, function (err, data) {
                  if (data) {
                  // return the information including token as JSON
                    resp.status(200).send({
                      success: true,
                      user: user,
                      token: 'JWT ' + token(user)
                    })
                  } else {
                   
                    resp.status(403).send({
                      success: false,
                      error: 'Authentication failed! Wrong token generated.'
                    })
                  }
                })
              } else {
                resp.status(403).send({
                  success: false,
                  error: 'Authentication failed. Wrong password.'
                })
              }
            })
          }
        })
      })
      .catch((err) => {
        return resp.status(400).send({
          success: false,
          error: err.message
        })
      })
  },
  async register (req, resp, next) {
    await req.getValidationResult()
      .then(validationHandler())
      .then(() => {
        const { username, email, password, membershipType } = req.body
        User
          .findOne({
            'username': username
          }, function (err, user) {
            if (err) {
              return resp.status(500).send({
                success: false,
                message: 'Internal Server error'
              })
            }
            if (user) {
              return resp.status(401).json({
                success: false,
                message: 'User already exist, please login with your credentials.'
              })
            }
            const newUser = new User()
            newUser.username = username
            newUser.email = email
            newUser.membership_type = membershipType
            newUser.password = password
            if (!newUser.password) {
              console.log('here')
              return resp.status(401).send({
                success: false,
                token: null
              })
            }
            newUser.save(function (err) {
              if (err) {
                return resp.status(500).json({
                  success: false,
                  message: 'Unable to save user internal server error'
                })
              }
              resp.status(200).send({
                success: true,
                user: newUser,
                token: 'JWT ' + token(newUser)
              })
            })
          })
      })
      .catch((err) => {
        return resp.status(400).send({
          success: false,
          err: err.message
        })
      })
  }
}
