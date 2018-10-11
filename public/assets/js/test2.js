// TODO: make these on click handlers in a modular format and not just stand alone on click event handlers.
//
// this on click event is to handle mobile/tablet hamburger navigation. similar click events are in init.js that came with the template, but for some reason didn't work. this is a hack to work for now. moving on as this now works as expected, will revisit later to revise.
$(document).on('click', '#header-mobile__toggle, .back-arrow, .site-overlay', function() {
  $('.site-wrapper').toggleClass('site-wrapper--has-overlay');
});

// the digitalData request
// $.getJSON("api/digitalData", function(data) {
//   console.log('digitalData');
//   var privateStuff = JSON.stringify(data);
//   privateStuff = JSON.parse(privateStuff);

//   // make privateStuff public for debugging/analytic purposes as our digitalData object in the console
//   window['digitalData'] = privateStuff;
// });




// laliga developers request
// $.getJSON("api/laligaDevelopers", function(data) {
//   console.log('laligaDevelopers');
//   var privateStuff = JSON.stringify(data);
//   privateStuff = JSON.parse(privateStuff);

//   // expose developers array to the client side
//   window['laliga'] = privateStuff;
// });
// $.ajax({
//   type: 'GET',
//   url: '/api/laligaDevelopers'
// }).then(function(data) {
//   console.log('success make laligaDevelopers global');
//   var privateStuff = JSON.stringify(data);
//   privateStuff = JSON.parse(privateStuff);

//   // expose developers array to the client side
//   window['laliga'] = privateStuff;
// });
