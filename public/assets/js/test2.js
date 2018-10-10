// console.log('test2');
//
$(document).on('click', '#header-mobile__toggle', function() {
  console.log('ayo');
  $('.site-wrapper').toggleClass('site-wrapper--has-overlay');
});


$(document).on('click', '.back-arrow, .site-overlay', function() {
  console.log('.back-arrow');
  $('.site-wrapper').toggleClass('site-wrapper--has-overlay');
});
