
// The DigitalDataFunctions are helper functions to help populate the digitalData object.
const DigitalDataFunctions = (function() {
  // declare any local variables to be used within the DigitalDataFunctions
  // const aTestVariable = 'test!';

  //another function private to Module
  const getPageType = function() {
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
  };

  const getScreenWidth = function() {
    return screen.width;
  };

  const getScreenHeight = function() {
    return screen.height;
  };

  // return any functions to be used throughout our application
  return {
    getPageType: getPageType,
    getScreenWidth: getScreenWidth,
    getScreenHeight: getScreenHeight
  }
})(); // self invoke the Module so it can be called later

