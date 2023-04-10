const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require("../models/user"); // Import your user model

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "your_jwt_secret_key_here"; // Replace with your JWT secret key

passport.use(
  new JWTStrategy(opts, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload.sub }, (err, user) => { // sub is the subject field of the token
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;