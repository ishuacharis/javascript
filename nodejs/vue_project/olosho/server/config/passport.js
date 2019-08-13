
const passportJWT = require('passport-jwt')
const JwtStrategy = passportJWT.Strategy,
  ExtractJwt = passportJWT.ExtractJwt;
 
// load up the user model
var User = require('../db/models/user');
var settings = require('../config/settings'); // get settings file

module.exports = function (passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
  opts.secretOrKey = settings.secret;
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    //console.log('payload received', jwt_payload);
    User.findOne({
      id: jwt_payload.id
    }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));


/*   passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    models.user.findOne(id, (err, user) => {
      cb(err, user);
    });
  }); */
};