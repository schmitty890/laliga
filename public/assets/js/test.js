//the Test Module is a namespaced function to what feature of the site this function powers
const Test = (function() {
  const aTestVariable = 'test!';

  //another function private to Module
  const privateFunction = function() {
    //this can log the 'aTestVariable' because it is defined outside of this Module function, but aTestVariable is kept private to this Module
    if(aTestVariable) {
      // console.log(aTestVariable);
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
