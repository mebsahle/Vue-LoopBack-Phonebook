// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const path = require('path'); // add path to use it configuring template-path
const nodemailer = require('nodemailer'); // to setup email authentication

// create reusable transporter object using default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: 'youraccount@gmail.com',
    clientId: "xxxxxx-xxxx.apps.googleusercontent.com",
    clientSecret: "yoursecret"
  },
});

transporter.set('oauth2_provision_cb', (user, renew, callback) => {
  let accessToken = userTokens[user];
  if(!accessToken) {
    return callback(new Error('Unknown user'));
  } else {
    return callback(null, accessToken);
  }
});

const app = module.exports = loopback();

// configure template-view handler
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(loopback.token());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
