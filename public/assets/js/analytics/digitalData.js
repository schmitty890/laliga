$( document ).ready(function() {
  console.log('analytics script start');
  $.ajax({
    type: 'GET',
    url: '/api/digitalData'
  }).then(function(data) {
    // Our digitalData object
    var digitalData = {
      user: data.data,
      pageType: DigitalDataFunctions.getPageType(),
      screenHeight: DigitalDataFunctions.getScreenHeight(),
      screenWidth: DigitalDataFunctions.getScreenWidth()
    };
    // console.log(digitalData);

    // make privateStuff public for debugging/analytic purposes as our digitalData object in the console
    window['digitalData'] = digitalData;
  });
});
