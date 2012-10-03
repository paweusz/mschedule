"use strict";

var msched = angular.module('MSchedule');

msched.weekdays = [
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek"
];

msched.hmToDate = function(hour, minute) {
  return new Date(0, 0, 1, hour, minute);
};

msched.Timeslot = function(startHour, startMinute, endHour, endMinute) {
  this.start = msched.hmToDate(startHour, startMinute);
  this.end = msched.hmToDate(endHour, endMinute);
}

msched.Timeslot.prototype = {

  getStartHour: function() {
    return this.start.getHours();
  },
  
  getStartMinute: function() {
    return this.start.getMinutes();
  },
  
  getEndHour: function() {
    return this.end.getHours();
  },
  
  getEndMinute: function() {
    return this.end.getMinutes();
  }
  
};

msched.timeslots = [
  new msched.Timeslot(8, 0, 8, 45),
  new msched.Timeslot(8, 50, 9, 35),
  new msched.Timeslot(9, 45, 10, 30),
  new msched.Timeslot(10, 40, 11, 25),
  new msched.Timeslot(11, 45, 12, 30),
  new msched.Timeslot(12, 45, 13, 30),
  new msched.Timeslot(13, 35, 14, 20),
  new msched.Timeslot(14, 25, 15, 10)
];

msched.subjects = {
  ew: "Edukacja wczesnoszkolna",
  inf: "Zajęcia komputerowe",
  ewsg: "Wychowanie fizyczne",
  ang: "Język angielski",
  rel: "Religia"
};

msched.lessons = [
  ["ew", "ew", "ew", "inf"],
  ["ew", "ewsg", "ang", "ew", "ew"],
  ["ew", "ew", "ew", "rel", "ang"],
  ["ew", "ewsg", "ew", "ew", "ew"],
  [null, null, "rel", "ew", "ew", "ew"]
];

