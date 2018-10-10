// console.log('test2');
// TODO: make these on click handlers in a modular format and not just stand alone on click event handlers.
//

$(document).on('click', '#header-mobile__toggle, .back-arrow, .site-overlay', function() {
  $('.site-wrapper').toggleClass('site-wrapper--has-overlay');
});
