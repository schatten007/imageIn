const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require("../models/User"); // Import your user model

// Set up JWT options
const JWTOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
};


// Use JWT Strategy to authenticate user requests
passport.use(new JWTStrategy(JWTOptions, (jwtPayload, done) => {
  User.findOne({ _id: jwtPayload.userId })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch((err) => {
      return done(err, false);
    });
}));


// Export passport with JWT authentication
module.exports = passport.authenticate('jwt', { session: false });