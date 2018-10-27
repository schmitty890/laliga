
$(document).on('click', '.header-logo__img', function() {
  // ga('send', 'event', 'button', 'click', 'main logo desktop');
  ga('send', 'event', {
    eventCategory: 'logo click take 2',
    eventAction: 'click',
    eventLabel: event.target.href
  });
});

// $(document).on('click', '.header-mobile__logo-img', function() {
//   ga('send', 'event', 'button', 'click', 'main logo mobile');
// });
