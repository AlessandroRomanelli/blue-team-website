function updateCountdown() {
  timeLeft = updateTime();
  if (parseInt(timeLeft.weeks) == 1) {
    $('#weeks p:last-of-type').text('Settimana');
  } else {
    $('#weeks p:last-of-type').text('Settimane');
  }
  $('#weeks p:first-of-type').text(timeLeft.weeks);
  if (parseInt(timeLeft.days) == 1) {
    $('#days p:last-of-type').text('Giorno');
  } else {
    $('#days p:last-of-type').text('Giorni');
  }
  $('#days p:first-of-type').text(timeLeft.days);
  if (parseInt(timeLeft.hours) == 1) {
    $('#hours p:last-of-type').text('Ora');
  } else {
    $('#hours p:last-of-type').text('Ore');
  }
  $('#hours p:first-of-type').text(timeLeft.hours);
  if (parseInt(timeLeft.minutes) == 1) {
    $('#minutes p:last-of-type').text('Minuto');
  } else {
    $('#minutes p:last-of-type').text('Minuti');
  }
  $('#minutes p:first-of-type').text(timeLeft.minutes);
  if (parseInt(timeLeft.seconds) == 1) {
    $('#seconds p:last-of-type').text('Secondo');
  } else {
    $('#seconds p:last-of-type').text('Secondi');
  }
  $('#seconds p:first-of-type').text(timeLeft.seconds);
}

function formatNumber(number) {
  return ("0" + number).slice(-2);
}

function updateTime() {
  var timeLeft = nextMatch.getTime() - new Date().getTime();
  var weeks = formatNumber(Math.floor(timeLeft / 604800000));
  timeLeft -= 604800000 * weeks;
  var days = formatNumber(Math.floor(timeLeft / 86400000));
  timeLeft -= 86400000 * days;
  var hours = formatNumber(Math.floor(timeLeft / 3600000));
  timeLeft -= 3600000 * hours;
  var minutes = formatNumber(Math.floor(timeLeft / 60000));
  timeLeft -= 60000 * minutes;
  var seconds = formatNumber(Math.floor(timeLeft / 1000));
  return timeLeft = {
    weeks: weeks,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

$(document).ready(function() {
  updateCountdown();
  setInterval(updateCountdown, 1000)
  $('#join-us').hover(function() {
    $(this).toggleClass('heartbeat');
  })
});