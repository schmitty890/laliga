
$(document).on('click', '.header-logo', function() {
  // ga('send', 'event', 'button', 'click', 'main logo desktop');
  ga('send', 'event', {
    eventCategory: 'logo click',
    eventAction: 'click',
    eventLabel: event.target.href
  });
});

// $(document).on('click', '.header-mobile__logo-img', function() {
//   ga('send', 'event', 'button', 'click', 'main logo mobile');
// });
