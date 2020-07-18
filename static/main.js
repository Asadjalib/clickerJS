// Document Object Model (DOM) Manipulation
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#in").onclick = countUp;
  document.querySelector("#out").onclick = countDown;
  document.querySelector("#reset").onclick = reset;
  document.querySelector("#undo").onclick = undo;
  document.querySelector("#downloadCsv").onclick = downloadFile;
});

// Global Variables
let counter = 0;
let myClicks = [];
let id = 0;
let totals;
let totalsMap;
let peakClicks = 0;
let timestampIn;
let timeStampInMap;
let avgIn;
let avgInConverted;

// CORE FUNCTIONS

// Increment The Counter
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
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds() +
    ":" +
    today.getMilliseconds();
  var dateTime = time;
  myClicks.push({
    id: id,
    type: 1,
    timestamp: timestamp,
    actualTime: dateTime,
    total: counter,
  });
  updateAverages();
}

function convertToArray(thingsToConvert) {
  var myClicksArray = [["Id", "Type", "Time", "Total"]];
  thingsToConvert.forEach(function (item) {
    myClicksArray.push([item.id, item.type, item.actualTime, item.total]);
  });
  return myClicksArray;
}

function getFileName() {
  return document.getElementById("filename").value;
}

function downloadFile() {
  var data2 = convertToArray(myClicks);
  let csvContent = "data:text/csv;charset=utf-8,";
  data2.forEach(function (rowArray) {
    let row = rowArray.join(",");
    csvContent += row + "\r\n";
  });
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", getFileName() + ".csv");
  document.body.appendChild(link);
  link.click();
}

// Decrements The Counter
function countDown() {
  if (counter != 0) {
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
}

// Resets The Counter
function reset() {
  avgIn = 0;
  avgOut = 0;
  avgInConverted = 0;
  counter = 0;
  peakClicks = 0;
  id = 0;
  myClicks = [];
  document.querySelector("#counter").innerHTML = counter;
  document.querySelector("#peakClicks").innerHTML = peakClicks;
  document.querySelector("#avgIn").innerHTML = avgIn;
  document.querySelector("#avgVisit").innerHTML = avgOut;
  //var myString = JSON.stringify(myClicks);
  // document.querySelector("#myClicks").innerHTML = myString;
}

// Undo Button
function undo() {
  myClicks.pop();
  if (counter == peakClicks && counter > 0) {
    peakClicks--;
    id--;
  }
  if (myClicks.length == 0) {
    counter = 0;
    id = 0;
  } else {
    counter = myClicks[myClicks.length - 1]["total"];
  }
  document.querySelector("#peakClicks").innerHTML = peakClicks;
  document.querySelector("#counter").innerHTML = counter;
  var myJSON = JSON.stringify(myClicks);
  console.log(myJSON.items);
  updateAverages();
}

// Download Session Data
// Email Session Data

// SUPPORTING FUNCTIONS

// Turn milliseconds into appropriate statistic display
function msToTime(duration) {
  duration = duration * 100000;
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // return hours > 0
  //   ? hours + " H " + minutes + " M " + seconds + " S"
  //   : minutes > 0
  //   ? minutes + " M " + seconds + " S"
  //   : seconds > 0
  //   ? seconds + " S"
  //   : 0;
  return seconds > 0
    ? hours + "h " + minutes + "m " + seconds + "s"
    : "00" + "h " + "00" + "m " + "00" + "s";
}

// show clicks
function showClicks() {
  var myString = JSON.stringify(myClicks);
  document.querySelector("#myClicks").innerHTML = myString;
}

// workspace END

// COMPLETED START

function updateAverages() {
  ins = arrayOfTimeDifference(myClicks, 1);
  ins = msToTime(ins);
  outs = arrayOfTimeDifference(myClicks, 0);
  outs = msToTime(outs);
  document.querySelector("#avgIn").innerHTML = ins;
  document.querySelector("#avgVisit").innerHTML = outs;
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
  if (h >= 13) {
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
    newTime = convertTimeToMinutes(temp[1]["timestamp"]);
    difference.push(newTime - base);
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
