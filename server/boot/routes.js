var dsConfig = require('../datasources.json');

module.exports = function(app) {
  var User = app.models.user;

  // User.create({
  //   email: 'mebgee@gmail.com',
  //   password: 'l00pback'
  //   }, function(err, userInstance) {
  //   console.log(userInstance);
  // });

  console.log('here in routes.js')

  //login page
  app.get('/login', function(req, res) {
    console.log('user login')
    var credentials = dsConfig.emailDs.transports[0].auth;
    // console.log('cred', dsConfig.emailDs.transports[0])
    res.render('login', {
      email: credentials.user,
      password: credentials.pass
    });
  });

  //verified
  app.get('/verified', function(req, res) {
    res.redirect('http://localhost:8080/#/verified')
    res.render('verified');
  });

  //log a user in
  app.post('/login', function(req, res) {
    // console.log('Here I am')
    User.login({
      email: req.body.email,
      password: req.body.password
    }, 'user', function(err, token) {
      if (err) {
        if(err.details && err.code === 'LOGIN_FAILED_EMAIL_NOT_VERIFIED'){
          res.render('reponseToTriggerEmail', {
            title: 'Login failed',
            content: err,
            redirectToEmail: '/api/users/'+ err.details.userId + '/verify',
            redirectTo: 'http://localhost:8080/#/login',
            redirectToLinkText: 'Click here',
            userId: err.details.userId
          });
        } else {
          res.render('response', {
            title: 'Login failed. Wrong username or password',
            content: err,
            redirectTo: 'http://localhost:8080/#/login',
            redirectToLinkText: 'Please login again',
          });
        }
        return;
      }
      res.render('home', {
        email: req.body.email,
        accessToken: token.id,
        redirectUrl: '/api/users/change-password?access_token=' + token.id
      });
    });
  });

  //log a user out
  app.get('/logout', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    User.logout(req.accessToken.id, function(err) {
      if (err) return next(err);
      res.redirect('http://localhost:8080/#/login');
    });
  });

  //send an email with instructions to reset an existing user's password
  app.post('/password-reset-request', function(req, res, next) {
    console.log('just getting started', req)
    User.resetPassword({
      email: req.body.email
    }, function(err) {
      if (err) return res.status(401).send(err);

      res.render('response', {
        title: 'Password reset requested',
        content: 'Check your email for further instructions',
        redirectTo: 'http://localhost:8080/#/login',
        redirectToLinkText: 'Login'
      });
    });
  });

  //show password reset form
  app.get('/reset-password', function(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    // use the vue component
    // i.e.override the template form
    res.redirect('http://localhost:8080/#/password-reset?access_token='
    +req.accessToken.id)
    // reset the password
    res.render('password-reset', {
      redirectUrl: '/api/users/reset-password?access_token='+
        req.accessToken.id
    });
  });
};
