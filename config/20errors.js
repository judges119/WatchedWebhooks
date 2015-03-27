//Error handling middleware
module.exports = function(app) {
  //404 errors, these aren't logged like system errors because of potential for abuse
  app.use(function(req, res, next) {
    res.status(404);
    res.render('errors/500');
  });

  //Actual system errors
  app.use(function(err, req, res, next) {
    //Log to stderr
    if (app.settings.error.log.stderr) {
      console.error(err.toString());
    }
    //Log to file
    if (app.settings.error.log.file) {
      fs.appendFile(app.settings.error.log.name, err.toString(), function(err) {
        if (err) {
          throw err;
        }
      });
    }
    //Send email with error
    if (app.settings.error.email) {
      app.smtp.sendMail({
        from: app.settings.smtp.from,
        to: app.settings.error.address,
        subject: 'KnifeheadCMS Error',
        text: err.toString()
      });
    }
    //Respond to client with error
    res.status(500);
    (req.xhr) ? res.json({ error: 'There has been a system error.' }) : res.render('errors/500');
  });
}