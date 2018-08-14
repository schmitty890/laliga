const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/User');

const randomBytesAsync = promisify(crypto.randomBytes);
const passportConfig = require('../config/passport');

module.exports = function (app) {

  /**
   * GET /account
   * Account page
   * Ensure user is authenticated in passport first then render account page
   */
  app.get('/account', passportConfig.isAuthenticated, function(req, res) {
    console.log('SUCCESS!!!!!!');
    const hbsObject = {
      user: req.user
    }
    res.render('account/profile', {
      title: 'Account Management',
      hbsObject: hbsObject
    });
  });


  /**
   * POST /account/profile
   * Update profile information.
   * Ensure user is authenticated in passport first then render account page
   */
  app.post('/account/profile', passportConfig.isAuthenticated, function(req, res) {
    req.assert('email', 'Please enter a valid email address.').isEmail();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();

    if(errors) {
      req.flash('errors', errors);
      return res.redirect('/account');
    }

    User.findById(req.user.id, (err, user) => {
      if(err) { return next(err); }
      user.email = req.body.email || '';
      user.profile.name = req.body.name || '';
      user.profile.gender = req.body.gender || '';
      user.profile.location = req.body.location || '';
      user.profile.website = req.body.website || '';
      user.save((err) => {
        if(err) {
          if(err.code === 11000) {
            req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
            return res.redirect('/account');
          }
          return next(err);
        }
        req.flash('success', { msg: 'Profile information has been updated.' });
        res.redirect('/account');
      });
    });
  });



  /**
   * POST /account/password
   * Update current password.
   */
  app.post('/account/password', passportConfig.isAuthenticated, function(req, res) {
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();

    if(errors) {
      req.flash('errors', errors);
      return res.redirect('/account');
    }

    User.findById(req.user.id, (err, user) => {
      if(err) { return next(err); }
      user.password = req.body.password;
      user.save((err) => {
        if(err) { return next(err); }
        req.flash('success', { msg: 'Password has been changed.' });
        res.redirect('/account');
      });
    });
  });


  /**
   * POST /account/delete
   * Delete user account.
   */
  app.post('/account/delete', passportConfig.isAuthenticated, function(req, res) {
    User.remove({ _id: req.user.id }, (err) => {
      if(err) { return next(err); }
      req.logout();
      req.flash('info', { msg: 'Your account has been deleted.' });
      res.redirect('/');
    });
  });


};
