
$(document).on('click', '.data-user-name', function() {
  console.log('ga test');
  // ga('send', 'event', 'button', 'click', 'main logo desktop');
  ga('send', {
    hitType: 'event',
    eventCategory: 'Videos',
    eventAction: 'play',
    eventLabel: 'Fall Campaign'
  });
});

// $(document).on('click', '.header-mobile__logo-img', function() {
//   ga('send', 'event', 'button', 'click', 'main logo mobile');
// });
