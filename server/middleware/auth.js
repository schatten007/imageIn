const passport = require('../config/passport');

function ensureAuthenticated(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      req.user = user;
      return next();
    })(req, res, next);
  }
  
  module.exports = {
    ensureAuthenticated
  }
  