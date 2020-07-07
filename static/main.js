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
let peakClicks = 0;

// Global Variables

let timestampIn;
let timeStampInMap;
let avgIn;
let avgInConverted;

// show clicks
function showClicks() {
  var myString = JSON.stringify(myClicks);
  document.querySelector("#myClicks").innerHTML = myString;
}

// workspace END

// COMPLETED START

// increments the count
function countUp() {
  counter++;
  if (counter > peakClicks) {
    peakClicks = counter;
  }
  document.querySelector("#peakClicks").innerHTML = peakClicks;
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
  updateAverages();
}
function updateAverages() {
  // showClicks();
  ins = arrayOfTimeDifference(myClicks, 1);
  ins = msToTime(ins);
  outs = arrayOfTimeDifference(myClicks, 0);
  outs = msToTime(outs);
  document.querySelector("#avgin").innerHTML = ins;
  document.querySelector("#avgout").innerHTML = outs;
  avgv = ins - outs;
  document.querySelector("avgv").innerHTML = avgv;
}

// decrements the count
function countDown() {
  counter--;
  if (counter > peakClicks) {
    peakClicks = counter;
  }
  document.querySelector("#peakClicks").innerHTML = peakClicks;
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
  updateAverages();
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
  var h = date.getHours() * 60;
  var s = date.getSeconds() / 60;
  return h + m + s;
}
function arrayOfTimeDifference(original, target) {
  var temp = [];
  for (var i = 0; i < original.length; i++) {
    if (original[i]["type"] == target) {
      temp.push(original[i]);
    }
  }
  var difference = [];
  while (temp.length > 1) {
    base = convertTimeToMinutes(temp[0]["timestamp"]);
    newtime = convertTimeToMinutes(temp[1]["timestamp"]);
    difference.push(newtime - base);
    temp.splice(0, 1);
  }
  return avgOfArray(difference);
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

function msToTime(duration) {
  duration = duration * 100000;
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours > 0
    ? hours + " H" + minutes + " M " + seconds + " S"
    : minutes > 0
    ? minutes + " M " + seconds + " S"
    : seconds > 0
    ? seconds + " S"
    : 0;
}
