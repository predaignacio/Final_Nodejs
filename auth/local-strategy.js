var passport = module.parent.exports.passport,
  LocalStrategy = require('passport-local').Strategy,
  Employees = require('../models/employees.js');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use('AdminLogin', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    Employees.findOne({ email:username }, function(err, adm) {
      if (err) { return done(err); }
      if (!adm) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!adm.authenticate(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, adm);
    });
  }
));

