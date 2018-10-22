(function($) {
  // Place JavaScript code here...
  console.log(`testing testing!!! ;) :) :P !`);
})(jQuery);

$(document).ready(function()
  {
    $("#table-standings-innercitydgk-js, #table-standings-yuppyville-js").tablesorter({sortList: [[1,1], [1]]}); // this sorts the second column (table header - the wins column), in ascending order to display the highest wins in first and so on
  }
);
