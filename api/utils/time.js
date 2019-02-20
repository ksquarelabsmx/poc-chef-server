const moment = require("moment");

function getTimeFromMins(mins) {
  // do not include the first validation check if you want, for example,
  // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
  if (mins >= 24 * 60 || mins < 0) {
    throw new RangeError(
      "Valid input should be greater than or equal to 0 and less than 1440."
    );
  }
  var h = (mins / 60) | 0,
    m = mins % 60 | 0;
  return moment
    .utc()
    .hours(h)
    .minutes(m)
    .format("hh:mm:ss");
}

function getTimeFromEpoch(epoch) {
  var day = moment.unix(epoch);
  day = day.startOf("day").format("YYYY-MM-DD");
  return day;
}

function getStringDate(day) {
  return day.format("DD-MM-YYYY");
}

module.exports = {
  getTimeFromEpoch,
  getTimeFromMins,
  getStringDate
};