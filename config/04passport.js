var passport = require('passport');

module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session({ pauseStream: true }));

  //Session serialisation and deserialisation
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  //Middleware providing helper properties/objects to views
  app.use(function(req, res, next) {
    if (res.locals.isAuthenticated = req.isAuthenticated()) {
        res.locals.user = req.user;
    }
  });
}