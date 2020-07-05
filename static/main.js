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
let maxClicks = 0;

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
  if (counter > maxClicks) {
    maxClicks = counter;
  }
  document.querySelector("#maxClicks").innerHTML = maxClicks;
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

  var myJSON = JSON.stringify(myClicks);
  console.log(myJSON.items);
  const x = showClicks();
  var test = arrayOfTimeDifference(myClicks, 1);
  console.log(myClicks[0]["timestamp"]);
}

// decrements the count
function countDown() {
  counter--;
  if (counter > maxClicks) {
    maxClicks = counter;
  }
  document.querySelector("#maxClicks").innerHTML = maxClicks;
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
function convertTimeToMinutes(time) {
  var date = new Date(time);
  var m = date.getMinutes();
  var h = date.getHours();
  var s = date.getSeconds();
  return 60 * h + m + s / 60;
}
function arrayOfTimeDifference(original, target) {
  base = convertTimeToMinutes(original[0]["timestamp"]);
  var temp = original.slice(0);
  var difference = [];
  console.log(original);
  while (temp.length > 1) {
    if (temp[1]["type"] == target) {
      difference.push(convertTimeToMinutes(temp[1]["timestamp"]) - base);
      temp.splice(1, 1);
    }
  }
  console.log(avgOfArray(difference));
  console.log(difference);
}

function avgOfArray(A) {
  var sum = 0;
  var counter = 0;
  for (i = 0; i < A.length; i++) {
    sum += A[i];
    counter += 1;
  }
  return sum / counter;
}
