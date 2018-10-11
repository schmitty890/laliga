// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var db = require("../models");
var axios = require('axios');
const request = require('request');
const cheerio = require('cheerio');
// Routes
// =============================================================
module.exports = function(app) {
  // DigitalData object
  // app.get('/api/digitalData', function(req, res) {
  //   res.json({
  //     user: req.user
  //   });
  // });

// here are two examples of scraping / nyt and these will be converted to use app.get('/api/scraping') instead of exports.getScraping
// /**
//  * GET /api/scraping
//  * Web scraping example using Cheerio library.
//  */
// exports.getScraping = (req, res, next) => {
//   request.get('https://news.ycombinator.com/', (err, request, body) => {
//     if (err) { return next(err); }
//     const $ = cheerio.load(body);
//     const links = [];
//     $('.title a[href^="http"], a[href^="https"]').each((index, element) => {
//       links.push($(element));
//     });
//     res.render('api/scraping', {
//       title: 'Web Scraping',
//       links
//     });
//   });
// };


// /**
//  * GET /api/nyt
//  * New York Times API example.
//  */
// exports.getNewYorkTimes = (req, res, next) => {
//   const query = {
//     'list-name': 'young-adult',
//     'api-key': process.env.NYT_KEY
//   };
//   request.get({ url: 'http://api.nytimes.com/svc/books/v2/lists', qs: query }, (err, request, body) => {
//     if (err) { return next(err); }
//     if (request.statusCode === 403) {
//       return next(new Error('Invalid New York Times API Key'));
//     }
//     const books = JSON.parse(body).results;
//     res.render('api/nyt', {
//       title: 'New York Times API',
//       books
//     });
//   });
// };



  // app.post("/api/classifieds", function(req, res) {
  //   var userId = '';
  //   db.classifieds.create(req.body)
  //     .then(function(classified) {
  //       // console.log(classified, "made it here")
  //       res.json(classified);
  //     })
  //     .catch(function(err) {
  //       res.json({ status: "ERROR", message: err })
  //     })
  // });

  // app.get('/api/weather', function(req, res) {
  //   var openWeatherCreds = {
  //     apiKey: process.env.openWeatherMap,
  //     zipcode: 27510,
  //     city: 'Carrboro'
  //   }
  //   var queryURLweather = 'https://api.openweathermap.org/data/2.5/weather?zip=' + openWeatherCreds.zipcode + '&q=' + openWeatherCreds.city + '&units=imperial&appid=' + openWeatherCreds.apiKey;

  //   axios.get(queryURLweather)
  //     .then(function (resp) {
  //       res.send(resp.data);
  //     })
  //     .catch(function (error) {
  //       // console.log(error);
  //     });

  // });

  // app.get("/api/events", function(req, res) {
  //   db.event.findAll({
  //     order: [
  //       ['date', 'ASC']
  //     ]
  //   }).then( function(eventData) {
  //     res.json(eventData);
  //   })
  // })


};
