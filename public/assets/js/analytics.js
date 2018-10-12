$( document ).ready(function() {
  console.log('analytics script start');
  $.ajax({
    type: 'GET',
    url: '/api/digitalData'
  }).then(function(data) {
    // Our digitalData object
    var digitalData = {
      user: data.data,
      pageType: getPageType()
    };

    function getPageType() {
        var page;
        var pagePath = window.location.pathname;
        switch(pagePath) {
          case "/":
            page = "hp";
            break;
          case "/facts":
            page = "facts";
            break;
          default:
            page = "n/a";
        }
        return page;
    }

    // console.log(digitalData);

    // make privateStuff public for debugging/analytic purposes as our digitalData object in the console
    window['digitalData'] = digitalData;
  });
});
