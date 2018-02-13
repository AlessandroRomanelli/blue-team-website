const express = require('express');
const router = express.Router();
const google = require("googleapis");
const sheets = google.sheets("v4");

function isBlueRow(row) {
  return ((row[1] == 'Blue' || row[2] == 'Blue') && row[2] !== 'RIPOSO');
}

function makeDate(row) {
  var date = row[3].slice(4).split('.');
  date = new Date(`20${date[2]}`, `${date[1]-1}`, date[0], 20, 00, 00, 00);
  return date
};

function getLastMatches(row) {
  var date = makeDate(row);
  var now = new Date();
  return date < now
}

function getNextMatches(row) {
  var date = makeDate(row)
  var now = new Date();
  return date > now
}

function sortMatches(row1, row2) {
  var date1 = makeDate(row1);
  var date2 = makeDate(row2);
  return date1 - date2
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var request = {
    spreadsheetId: "1_JQxgygNlms4bqes51YsFx-3MKYi8aN6yMGOb3bEM-0",
    range: "A10:M266",
    valueRenderOption: "FORMATTED_VALUE",
    dateTimeRenderOption: "SERIAL_NUMBER",
    auth: process.env.API_KEY || "AIzaSyC8kYitDoc-HWLZUfN4CUYkGcZG5XFCcS0"
  };
  sheets.spreadsheets.values.get(request, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }
    var blueData = response.data.values.filter(isBlueRow);
    var currentPosition = blueData.shift()[0];
    var lastMatches = blueData.filter(getLastMatches).sort(sortMatches).splice(-3);
    lastMatches.reverse().forEach(function(row) {
      row[3] = row[3].slice(4);
    });
    var nextMatches = blueData.filter(getNextMatches);
    var nextMatchDate = makeDate(nextMatches.shift()).getTime();
    debugger;
    res.render('index', {
      position: currentPosition,
      lastMatches: lastMatches,
      nextMatch: nextMatchDate
    });
  });
});

router.get('/contatti', function(req, res, next) {
  res.render('contacts', {});
});

module.exports = router;