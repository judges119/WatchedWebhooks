var mongoose = require('mongoose');

module.exports = function(app) {
  mongoose.connect(app.settings.mongodb.host + app.settings.mongodb.database, {
    user: (app.settings.mongodb.auth) ? app.settings.mongodb.username : undefined,
    pass: (app.settings.mongodb.auth) ? app.settings.mongodb.password : undefined
  });

  mongoose.connection.on('error', function(err){});
}