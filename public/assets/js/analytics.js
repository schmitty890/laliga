$( document ).ready(function() {
  console.log('analytics script start');
  console.log('analytics ajax call made');
  $.ajax({
    type: 'GET',
    url: '/api/digitalData'
  }).then(function(data) {
    // Make sure the data contains the username as expected before using it
    var privateStuff = JSON.stringify(data);
    privateStuff = JSON.parse(privateStuff);

    // make privateStuff public for debugging/analytic purposes as our digitalData object in the console
    window['digitalData'] = privateStuff;
    console.log(digitalData);
  });
});
