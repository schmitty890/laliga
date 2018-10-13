const moment = require('moment');
var momentFromNowTime = function (time) {
  return moment(time).fromNow();
}

module.exports = momentFromNowTime;