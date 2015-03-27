/*
This file contains common/major settings for KnifeheadCMS.
Changes to these settings will take effect after restarting KnifeheadCMS.
*/
//Powpow-pow.
module.exports = {
  //Needed for social sign-in callbacks
  host: 'http://localhost/'
  //Port be changed if it conflicts with another service using the same port
  port: 3000,
  //Outbound email settings
  smtp: {
    from: 'webmaster@knifehead.cms',
    host: 'smtp.mandrillapp.com',
    port: 587,
    auth: {
      method: 'LOGIN' //Or 'PLAIN'
      username: 'webmaster@knifehead.cms',
      password: '123456'
    }
  },
  //Sign-in strategies
  //If you plan on using Twitter or Facebook authentication you will need to register an app through the Twitter/Facebook developer center, where you can also acquire your key and secrets (which you fill out below) and set the callback which will be your host + "auth/twitter/callback" or your host + "auth/facebook/callback"
  auth: {
    local: {
      use: true
    },
    facebook: {
      use: true,
      app_id: '123456'
      app_secret: '123456'
    },
    twitter: {
      use: true,
      api_key: '123456',
      api_secret: '123456'
    }
  },
  //MongoDB details
  mongodb: {
    host: 'mongodb://localhost/',
    database: 'knifehead-dev',
    auth: false,
    username: '',
    password: ''
  },
  //Session secret
  session: {
    secret: 'kybord felix'
  },
  //Root directory
  root: require('path').resolve(__dirname),
  //If and where to send logging information
  logging: {
    file: true,
    name: require('path').resolve(__dirname) + '/logs/access.log',
    stdout: true
  },
  //If and where to send error information
  error: {
    email: true,
    address: 'webmaster@knifehead.cms',
    log: {
      file: true,
      name: require('path').resolve(__dirname) + '/logs/error.log',
      stderr: true
    }
  }
};