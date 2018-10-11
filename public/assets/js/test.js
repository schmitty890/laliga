//the Test Module is a namespaced function to what feature of the site this function powers
const Test = (function() {
  const aTestVariable = 'test!';

  //another function private to Module
  const privateFunction = function() {
    //this can log the 'aTestVariable' because it is defined outside of this Module function, but aTestVariable is kept private to this Module
    if(aTestVariable) {
      console.log(aTestVariable);
      $.ajax({
        type: 'GET',
        url: '/api/digitalData'
      }).then(function(data) {
        console.log('success make digitalData global');
        var privateStuff = JSON.stringify(data);
        privateStuff = JSON.parse(privateStuff);
        console.log(privateStuff);
        // make privateStuff public for debugging/analytic purposes as our digitalData object in the console
        // window['digitalData'] = privateStuff;
      });

    }
  }

  //this init function initializes the functions ran
  const init = function() {
    privateFunction();
  }

  //return the init function, assign it to init so it can be used outside of this Module as Test.init();
  return {
    init: init
  }
})(); //self invoke the Module so it can be called later

//how we call the Test Module to execute its functions
Test.init();
