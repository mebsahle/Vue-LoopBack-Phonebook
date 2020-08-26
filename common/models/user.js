var config = require('../../server/config.json');
var path = require('path');

var senderAddress = 'mebatsionsahle@gmail.com'; 
module.exports = function(User) {

    // send verification email after registration userinstance
    User.afterRemote('create', function(context, user, next) {
        var verifyOptions = {
            type: 'email',
            to: user.email,
            from: senderAddress,
            subject: 'Thanks for registering.',
            template: path.resolve(__dirname, '../../server/views/verify.ejs'),
            redirect: '/verified',
            user: user
        };
        
        user.verify(verifyOptions, function(err, response, next) {
            if(err) {
              User.deleteById(user.id);
              return next(err);
            }
            console.log('> verification email sent:', response);

            context.res.render('response', {
                title: 'signed up successfully',
                content: 'Please check your email and click on the '+
                'verification link' - 'before logging in.',
                redirectTo: 'http://localhost:8080/#/login',
                redirectToLinkText: 'Login'
            });
        });
    });

    // Method to render
    User.afterRemote('prototype.verify', function(context, user, next) {
        context.res.render('response', {
            title: 'A link to verify your identity has been sent '+
            'to your email successfully',
            content: 'Please check your email and click on the '+
            'verification link before logging in',
            redirectTo: 'http://localhost:8080/#/login',
            redirectToLinkText: 'Login'
        });
    });

    // send password reset link when requested
    User.on('resetPasswordRequest', function(info) {
        console.log('here in the user.js resetPasswprdRequest', info)
        var url = 'http://'+config.host+ ':' +config.port + '/reset-password';
        var html = 'Click <a href="' + url + '?access_token=' +
            info.accessToken.id + '">here</a> to reset your password';

        User.app.models.Email.send({
          to: info.email,
          from: senderAddress,
          subject: 'Password Reset Confirmation',
          html: html
        }, function(err) {
            if (err) return console.log('> error sending password reset email', err);
            console.log('> sending password reset email to:', info.email);
        });
    });

    // render UI page after password change
    User.afterRemote('changePassword', function(context, user, next)  {
        context.res.render('response', {
            title: 'Password changed successfully',
            content: 'Please login again with new password',
            redirectTo: 'http://localhost:8080/#/login',
            redirectToLinkText: 'Login'
        });
    });

    // render UI page after password reset
    User.afterRemote('setPassword', function(context, user, next) {
        context.res.render('response', {
            title: 'Password reset success',
            content: 'Your password has been reset successfully',
            redirectTo: 'http://localhost:8080/#/login',
            redirectToLinkText: 'Login'
        });
    });
};
