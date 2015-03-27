var responseTime = require('response-time');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var poweredBy = require('connect-powered-by');

module.exports = function(app) {
  //Pretty JSON output
  app.set('json spaces', 2);
  //Views
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'jade');
  //Start response time measurement
  app.use(responseTime());
  //Favicon serving
  app.use(favicon(__dirname + '/../public/favicon.ico'));
  //Static file serving
  app.use(express.static(__dirname + '/../public'));
  //Parse JSON
  app.use(bodyParser.json());
  //If a form contains a hidden field with _method and PUT/DELETE value, set that to the request method
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method
      delete req.body._method
      return method
    }
  }));
  //Session variables, stored in mongodb
  app.use(session({
    secret: app.settings.session.secret,
    saveUninitialized: true,
    proxy: true,
    name: 'knifehead.sid',
    store: new MongoStore({
      url: app.settings.mongodb.host + app.settings.mongodb.database,
    })
  }));
  app.use(poweredBy('KnifeheadCMS'));
  //Make settings available to views
  app.use(function(req, res, next) {
    res.locals.settings = app.settings;
  });
  //Logging
  app.use(morgan('combined'))
}