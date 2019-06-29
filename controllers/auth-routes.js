const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/User');
var db = require("../models");

const randomBytesAsync = promisify(crypto.randomBytes);
const passportConfig = require('../config/passport');
const champsStats = require('../data/champions.json');

module.exports = function (app) {

  /**
   * GET /account
   * Account page
   * Ensure user is authenticated in passport first then render this page
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
   * GET /story-post
   * Account page
   * Ensure user is authenticated in passport first then render this page
   */
  app.get('/story-post', passportConfig.isAuthenticated, function(req, res) {
    const hbsObject = {
      user: req.user
    }

    res.render('story-post', {
      title: 'Story Post',
      hbsObject: hbsObject
    });
  });


  /**
   * GET /facts
   * facts page
   * Ensure user is authenticated in passport first then render this page
   */
  app.get('/facts', passportConfig.isAuthenticated, function(req, res) {
    const hbsObject = {
      user: req.user
    }

    db.Fact.find({}, null, { sort: {'_id': -1} }, function(error, data) {
      if (error) throw error;

      hbsObject.facts = data;
      console.log(hbsObject);
      res.render('facts', {
        title: 'Facts',
        hbsObject: hbsObject
      });
    });
  });

  /**
   * POST /facts
   * facts page
   * Ensure user is authenticated in passport first then render this page
   */
  app.post("/fact", passportConfig.isAuthenticated, function(req, res) {
    const hbsObject = {
      user: req.user
    }
    // Create a new StoryPost and pass the req.body to the entry
    db.Fact.create(req.body)
      .then(function(dbFactPost) {
        // If saved successfully, send the the new User document to the client
        res.send(`Thanks for saving a fact, ${hbsObject.user.firstName}!`);
        // res.redirect('/');
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  /**
   * GET /betting-center
   * betting-center page
   * Ensure user is authenticated in passport first then render this page
   */
  app.get('/betting-center', passportConfig.isAuthenticated, function(req, res) {
    const hbsObject = {
      user: req.user
    }

    res.render('betting-center', {
      title: 'betting-center',
      hbsObject: hbsObject
    });
  });

  /**
   * GET /all-time-stats
   * all-time-stats page
   * Ensure user is authenticated in passport first then render this page
   */
  app.get('/all-time-stats', passportConfig.isAuthenticated, function(req, res) {
    const hbsObject = {
      user: req.user
    }

    res.render('all-time-stats', {
      title: 'all-time-stats',
      hbsObject: hbsObject
    });
  });

  /**
   * GET /champs
   * champs page
   * Ensure user is authenticated in passport first then render this page
   */
  app.get('/champs', passportConfig.isAuthenticated, function(req, res) {
    const hbsObject = {
      user: req.user,
      champions: champsStats
    }
    console.log(hbsObject.champions.title);
    console.log(hbsObject.champions);

    res.render('champs', {
      title: 'champs',
      hbsObject: hbsObject
    });
  });

  /**
   * GET /champs
   * champs page
   * Ensure user is authenticated in passport first then render this page
   */
  app.get('/champs/:year', passportConfig.isAuthenticated, function(req, res) {
    console.log(req.params.year);
    const hbsObject = {
      user: req.user,
      champion: champsStats.champions.find(function(team, i) {
        if(team.year == req.params.year) {
          return team;
        }
      })
    }

    console.log(hbsObject);

    res.render('champion', {
      title: 'champion',
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
      user.teamName = req.body.teamName || '';
      user.logo = req.body.logo || '';
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
