
$(document).on('click', '.header-logo', function() {
  ga('send', 'event', 'button', 'click', 'main logo desktop');
});

$(document).on('click', '.header-mobile__logo-img', function() {
  ga('send', 'event', 'button', 'click', 'main logo mobile');
});
