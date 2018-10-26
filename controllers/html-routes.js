const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/User');
var db = require("../models");
var innercitydgkStats = require('../data/innercitydgk-stats.json');
var yuppyvilleStats = require('../data/yuppyville-stats.json');

const randomBytesAsync = promisify(crypto.randomBytes);

module.exports = function (app) {

  // Home Page
  app.get('/', function (req, res) {
    var hbsObject = {
      user: req.user,
      yuppyvilleStats: yuppyvilleStats,
      innercitydgkStats: innercitydgkStats
    }
    db.StoryPost.find({}, null, { sort: {'_id': -1} }, function(error, data) {
      if (error) throw error;
      // console.log(data);

      hbsObject.storyPost = data;
      console.log(hbsObject);
      res.render('index', {
        title: 'Home',
        hbsObject: hbsObject
      });
    });

  });

  /**
   * GET /login
   * Login page.
   */
  app.get('/login', function (req, res) {
    if(req.user) {
      return res.redirect('/');
    }
    res.render('account/login', {
      title: 'Login'
    });
  });

  /**
   * POST /login
   * Sign in using email and password.
   */

  app.post('/login', function(req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();

    if(errors) {
      req.flash('errors', errors);
      return res.redirect('/login');
    }

    passport.authenticate('local', (err, user, info) => {
      if(err) { return next(err); }
      if(!user) {
        req.flash('errors', info);
        return res.redirect('/login');
      }
      req.logIn(user, (err) => {
        if(err) { return next(err); }
        req.flash('success', { msg: 'Success! You are logged in.' });
        res.redirect('/');
        // res.redirect to req.session.returnTo returned this to /api/digitalData endpoint - we want to redirect to homepage
        // res.redirect(req.session.returnTo || '/');
      });
    })(req, res, next);
  });

    /**
   * GET /logout
   * Log out.
   */
  app.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy((err) => {
      if(err) console.log('Error : Failed to destroy the session during logout.', err);
      req.user = null;
      res.redirect('/');
    });
  });

  /**
   * GET /forgot
   * Forgot Password page.
   */
  app.get('/forgot', function(req, res) {
    if(req.isAuthenticated()) {
      return res.redirect('/');
    }
    res.render('account/forgot', {
      title: 'Forgot Password'
    });
  });

  /**
   * POST /forgot
   * Create a random token, then the send user an email with a reset link.
   */
  app.post('/forgot', function(req, res, next) {
    req.assert('email', 'Please enter a valid email address.').isEmail();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();

    if(errors) {
      req.flash('errors', errors);
      return res.redirect('/forgot');
    }

    const createRandomToken = randomBytesAsync(16)
      .then(buf => buf.toString('hex'));

    console.log('----------------------------------');
    console.log(req.body.email);
    console.log('----------------------------------');
    const setRandomToken = token =>
      User
        .findOne({ email: req.body.email })
        .then((user) => {
          if(!user) {
            req.flash('errors', { msg: 'Account with that email address does not exist.' });
          } else {
            user.passwordResetToken = token;
            user.passwordResetExpires = Date.now() + 3600000; // 1 hour
            user = user.save();
          }
          return user;
        });

    const sendForgotPasswordEmail = (user) => {
    console.log('------------USER----------------------');
    console.log(user);
    console.log('----------------------------------');
      if(!user) { return; }
      const token = user.passwordResetToken;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAILEMAIL,
          pass: process.env.GMAILPASS
        }
      });
      console.log('---------------TRANSPORTER-------------------');
      console.log(transporter);
      console.log('----------------------------------');
      const mailOptions = {
        to: user.email,
        from: process.env.GMAILEMAIL,
        subject: 'Reset your password on La Liga',
        text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.headers.host}/reset/${token}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };
      return transporter.sendMail(mailOptions)
        .then(() => {
          req.flash('info', { msg: `An e-mail has been sent to ${user.email} with further instructions.` });
        });
    };

    createRandomToken
      .then(setRandomToken)
      .then(sendForgotPasswordEmail)
      .then(() => res.redirect('/forgot'))
      .catch(next);
  });

  /**
   * GET /signup
   * Signup page.
   */
  app.get('/signup', function(req, res) {
    if(req.user) {
      return res.redirect('/');
    }
    res.render('account/signup', {
      title: 'Create Account'
    });
  });

  /**
   * POST /signup
   * Create a new local account.
   */
  app.post('/signup', function(req, res, next) {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();

    if(errors) {
      req.flash('errors', errors);
      return res.redirect('/signup');
    }

    const user = new User({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      teamName: req.body.teamName
    });

    User.findOne({ email: req.body.email }, (err, existingUser) => {
      if(err) { return next(err); }
      if(existingUser) {
        console.log('Account with that email address already exists!')
        req.flash('errors', { msg: 'Account with that email address already exists.' });
        return res.redirect('/signup');
      }
      user.save((err) => {
        if(err) { return next(err); }
        req.logIn(user, (err) => {
          if(err) {
            return next(err);
          }
          res.redirect('/');
        });
      });
    });
  });

  /**
   * GET /reset/:token
   * Reset Password page.
   */
  app.get('/reset/:token', function(req, res, next) {
    if(req.isAuthenticated()) {
      return res.redirect('/');
    }
    User
      .findOne({ passwordResetToken: req.params.token })
      .where('passwordResetExpires').gt(Date.now())
      .exec((err, user) => {
        if(err) { return next(err); }
        if(!user) {
          req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
          return res.redirect('/forgot');
        }
        res.render('account/reset', {
          title: 'Password Reset'
        });
      });
  });

/**
 * POST /reset/:token
 * Process the reset password request.
 */
  app.post('/reset/:token', function(req, res, next) {
    req.assert('password', 'Password must be at least 4 characters long.').len(4);
    req.assert('confirm', 'Passwords must match.').equals(req.body.password);

    const errors = req.validationErrors();

    if(errors) {
      req.flash('errors', errors);
      return res.redirect('back');
    }

    const resetPassword = () =>
      User
        .findOne({ passwordResetToken: req.params.token })
        .where('passwordResetExpires').gt(Date.now())
        .then((user) => {
          if(!user) {
            req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
            return res.redirect('back');
          }
          user.password = req.body.password;
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          return user.save().then(() => new Promise((resolve, reject) => {
            req.logIn(user, (err) => {
              if(err) { return reject(err); }
              resolve(user);
            });
          }));
        });

    const sendResetPasswordEmail = (user) => {
      if(!user) { return; }
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAILEMAIL,
          pass: process.env.GMAILPASS
        }
      });
      const mailOptions = {
        to: user.email,
        from: process.env.GMAILEMAIL,
        subject: 'Your La Liga password has been changed',
        text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
      };
      return transporter.sendMail(mailOptions)
        .then(() => {
          req.flash('success', { msg: 'Success! Your password has been changed.' });
        });
    };

    resetPassword()
      .then(sendResetPasswordEmail)
      .then(() => { if(!res.finished) res.redirect('/'); })
      .catch(err => next(err));
  });

};
