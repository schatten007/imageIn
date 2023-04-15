const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');

const jwtSecret = process.env.SECRET;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
};

// @Passport JWT Strategy for Protected Routes
// In this implementation, we define a new instance of the JwtStrategy class from PassportJs. 
// We pass it an options object including the jwtFromRequest option which specifies where the strategy
// should find the JWT token in the incoming request (in this case the Authorization header's Bearer scheme).
// We also define our verify callback function that is executed when a JWT token is presented to the server, 
// which checks if the user is verified before returning a done callback to PassportJs to continue with the authentication process.
// We also define a middleware function called ensureAuthenticated that utilizes the JWT strategy. 
// It calls the passport.authenticate method with the 'jwt' strategy and options to disable sessions. 
// If authentication fails, it returns a 401 Unauthorized response. If authentication succeeds, 
// it sets req.user to the authenticated user and proceeds with the next middleware.
passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);
    if (!user) {
      return done(null, false, false);
    }

    if (!user.isVerified) {
      return done(null, user, false);
    }

    return done(null, user, true);
  } catch (err) {
    return done(err, false, false);
  }
}));


module.exports = passport;