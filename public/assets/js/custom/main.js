(function($) {
  // Place JavaScript code here...
  console.log(`testing testing!!! :) !`);
})(jQuery);

$(document).ready(function()
  {
    $("#table-standings-innercitydgk-js, #table-standings-yuppyville-js").tablesorter({sortList: [[1,1], [1]]});
  }
);
