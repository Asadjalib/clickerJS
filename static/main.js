document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#in").onclick = countUp;
  document.querySelector("#out").onclick = countDown;
  document.querySelector("#reset").onclick = reset;
});

let counter = 0;
let myClicks = [];
let id = 0;
let totals;
let totalsMap;
let maxClicks;

// workspace

let timestampIn;
let timeStampInMap;
let avgIn;
let avgInConverted;

// show clicks
function showClicks() {
  var myString = JSON.stringify(myClicks);
  document.querySelector("#myClicks").innerHTML = myString;
}

// wait time
timestampIn = myClicks.filter((c) => c.timestamp > 0);
timestampInMap = timestampIn.map((i) => i.timestamp);
avgIn =
  (timestampInMap.reduce((a, b) => a + b) - myClicks[0].timestamp) /
  timestampInMap.length;
//convert
avgInConverted = new Date(avgIn);

// workspace END

// COMPLETED START

// increments the count
function countUp() {
  counter++;
  id++;
  document.querySelector("#counter").innerHTML = counter;
  var date = new Date();
  var timestamp = date.getTime();
  myClicks.push({
    id: id,
    type: 1,
    timestamp: timestamp,
    total: counter,
  });

  // getMax
  const gettingMax = getMax();
}

// decrements the count
function countDown() {
  counter--;
  id++;
  document.querySelector("#counter").innerHTML = counter;
  var date = new Date();
  var timestamp = date.getTime();
  myClicks.push({
    id: id,
    type: 0,
    timestamp: timestamp,
    total: counter,
  });
}

// resets the counter
function reset() {
  counter = 0;
  document.querySelector("#counter").innerHTML = counter;
  var date = new Date();
  var timestamp = date.getTime();
  myClicks = [];
  var myString = JSON.stringify(myClicks);
  document.querySelector("#myClicks").innerHTML = myString;
}

// functions for the clock
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  var suf = "AM";
  if (h >= 12) {
    h = h - 12;
    suf = "PM";
  }
  document.getElementById("txt").innerHTML = h + ":" + m + ":" + s + " " + suf;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}

// get max visits in the session
function getMax() {
  totals = myClicks.filter((c) => c.total > 0);
  totalsMap = totals.map((i) => i.total);
  maxClicks = totalsMap.reduce(function (a, b) {
    return Math.max(a, b);
  });
  document.querySelector("#maxClicks").innerHTML = maxClicks;
}
