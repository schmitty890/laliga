// TODO: make these on click handlers in a modular format and not just stand alone on click event handlers.
//
// this on click event is to handle mobile/tablet hamburger navigation. similar click events are in init.js that came with the template, but for some reason didn't work. this is a hack to work for now. moving on as this now works as expected, will revisit later to revise.
$(document).on('click', '#header-mobile__toggle, .back-arrow, .site-overlay', function() {
  $('.site-wrapper').toggleClass('site-wrapper--has-overlay');
});
