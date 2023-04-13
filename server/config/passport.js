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


// @Passport Local Strategy for Login
// In this implementation, we define a new instance of the LocalStrategy class from PassportJs, 
// passing it an options object with usernameField and passwordField properties to specify
//  the name of the fields in the submitted form that contain the user's email and password, respectively.
// Our verify callback function will find the first user with the submitted email, 
// then use the comparePassword method on the user instance to check if the submitted 
// password matches the stored hash. Upon successful authentication, 
// we generate a signed JWT token using the user's id, and return it to the client in the third parameter of the done callback function.
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    if (!user.verified) {
      return done(null, false, { message: 'Please verify your account before logging in. Check your email for verification.'});
    }

    await user.comparePassword(password, (error, isMatch) => {
      if(error){
        throw new Error(error)
      }
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
  
      const token = jwt.sign({ sub: user._id }, jwtSecret);
      return done(null, user, { token });
    });

  } catch (err) {
    return done(err);
  }
}));

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
    const user = await User.findById(payload.sub);

    if (!user) {
      return done(null, false);
    }

    if (!user.verified) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}));


module.exports = passport;