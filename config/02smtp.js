var nodemailer = require('nodemailer');

module.exports = function(app) {
  app.smtp = nodemailer.createTransport({
    host: app.settings.smtp.host,
    port: app.settings.smtp.port,
    authMethod: app.settings.smtp.auth.method,
    auth: {
        user: app.settings.smtp.auth.username,
        pass: app.settings.smtp.auth.password
    }
  });
}