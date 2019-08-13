const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  d_o_b: {
    type: Date
  },
  profile_url: {
    type: String
  },
  gender: {
    type: String
  },
  membership_type: {
    type: String
  },
  languages: Array,
  services: Array,
  about: {
    type: String
  },
  rating: {
    type: Number
  },
  weight: {
    type: String
  },
  height: {
    type: String
  },
  tatoo: {
    type: Boolean
  },
  piercing: {
    type: Boolean
  },
  drink: {
    type: Boolean
  },
  smoke: {
    type: Boolean
  },
  orientation: {
    type: String
  },
  Nationality: {
    type: String
  },
  hair_color: {
    type: String
  },
  skin_color: {
    type: String
  },
  agency: {
    type: String
  },
  body_type: {
    type: String
  },
  ethnicity: {
    type: String
  },
  tribe: {
    type: String
  },
  incall: Array,
  outcall: Array,
  date_joined: {
    type: Date,
    default: Date.now

  },
  last_seen: {
    type: Date
  },
  date_updated: {
    type: Date
  },
  is_admin: {
    type: Boolean,
    default: false
  },
  photos: {
    type: Array
  }
})

userSchema.pre('save', function (next) {
  var user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        console.log(`bcrypt gave this error ${err}`)
        return next(err)
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          console.log(`bcrypt could not hash this password and gave this error ${err}`)
          return next(err)
        }
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
  let now = new Date()
  user.last_seen = now
  if (!user.date_joined) {
    user.date_joined = now
    next()
  }
})

userSchema.methods.comparePassword =  function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      console.log(err)
      return cb(err)
    }
    cb(null, isMatch)
  })
}

module.exports = mongoose.model('User', userSchema)
