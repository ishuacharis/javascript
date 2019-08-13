const {body} = require('express-validator/check')

exports.validate = (method) => {
  switch (method) {
    case 'login':
      return [
        body('username', 'Invalid username').isString().isLength({
          min: 2
        }),
        body('password', 'Invalid password').isLength({
          min: 2
        })
      ]
    case 'register':
      return [
        body('username', 'Invalid username').isLength({min: 2}),
        body('email', 'Invalid email').isEmail(),
        body('password', 'Invalid Password for register').isLength({min: 2})
      ]
  }
}
