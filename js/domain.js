/*global angular:false*/
(function () {
  "use strict";

  angular.module('MSchedule').factory('Domain', function() {

    function hmToDate(hour, minute) {
      return new Date(0, 0, 1, hour, minute);
    }

    function Timeslot(startHour, startMinute, endHour, endMinute) {
      this.start = hmToDate(startHour, startMinute);
      this.end = hmToDate(endHour, endMinute);
    }

    Timeslot.prototype = {

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

    return {

      weekdays: [
        {id: "mon", name: "Poniedziałek"},
        {id: "tue", name: "Wtorek"},
        {id: "wed", name: "Środa"},
        {id: "thu", name: "Czwartek"},
        {id: "fri", name: "Piątek"}
      ],

      subjects: {
        ew: "Edukacja wczesnoszkolna",
        inf: "Zajęcia komputerowe",
        ewsg: "Wychowanie fizyczne",
        ang: "Język angielski",
        rel: "Religia",
        kmat: "Kółko matematyczne"
      },

      lessons: [
        ["ew", "ew", "ew", "inf"],
        ["ew", "ewsg", "ang", "ew", "ew"],
        ["ew", "ew", "ew", "rel", "ang"],
        ["ew", "ewsg", "ew", "ew", "ew"],
        ["kmat", "kmat", "rel", "ew", "ew", "ew"]
      ],

      timeslots: [
        new Timeslot(8, 0, 8, 45),
        new Timeslot(8, 50, 9, 35),
        new Timeslot(9, 45, 10, 30),
        new Timeslot(10, 40, 11, 25),
        new Timeslot(11, 45, 12, 30),
        new Timeslot(12, 45, 13, 30),
        new Timeslot(13, 35, 14, 20),
        new Timeslot(14, 25, 15, 10)
      ],
      
      hmToDate: hmToDate

    };
  });
}());

