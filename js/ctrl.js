"use strict";

var msched = angular.module('MSchedule');

msched.controller('ScheduleCtrl', ['$scope', function ($scope) {

  function getDow(ts) {
    var dow = ts.getDay();
    if (dow == 0) {
      dow = 7;
    }
    return dow - 1;
  }
  
  function getCurrentDayIdx(ts) {
    var weekdaysNum = msched.weekdays.length;
    var dow = getDow(ts);
    
    if (dow > weekdaysNum) {
      return 0;
    }

    var idx = dow;    
    var lessonsNum = msched.lessons[dow].length;
    var timeslot = msched.timeslots[lessonsNum - 1];
    if (msched.hmToDate(ts.getHours(), ts.getMinutes()) > timeslot.end) {
      if (dow + 1 >= weekdaysNum) {
        idx = 0;
      } else {
        idx = dow + 1;
      }
    }    

    return idx;
  };

  function getCurrentLessonIdx(ts) {
    var weekdaysNum = msched.weekdays.length;
    var dow = getDow(ts);
    
    if (dow > weekdaysNum) {
      return -1;
    }

    var idx = -1;
    var lessons = msched.lessons[dow];
    var timeslots = msched.timeslots;
    var relTs = msched.hmToDate(ts.getHours(), ts.getMinutes());
    for (var i = 0; i < lessons.length; i++) {
      var ts0 = i == 0 ? timeslots[0].start : timeslots[i - 1].end;
      var ts1 = timeslots[i].end;
      if ((ts0 <= relTs) && (relTs < ts1)) {
        idx = i;
        break;
      }
    }
    
    return idx;
  };
  
  function updateLabels(scope) {
    scope.current = msched.weekdays[scope.index];
  };
  
  function updateLessons(scope) {
    scope.lessons = _.map(msched.lessons[scope.index], function(l) {
      return l != null ? msched.subjects[l] : null;
    });
    var ts = new Date();
    scope.lessonIdx = scope.index == getDow(ts) ? getCurrentLessonIdx(ts) : -1;
  };
  
  function update(scope) {
    updateLabels(scope);
    updateLessons(scope);
  };
  
  $scope.index = getCurrentDayIdx(new Date());

  $scope.backward = function() {
    this.index = this.index - 1 >= 0 ? this.index - 1 : msched.weekdays.length - 1;
    update(this);
  };
  
  $scope.forward = function() {
    this.index = this.index + 1 < msched.weekdays.length ? this.index + 1 : 0;
    update(this);
  };
  
  $scope.theme = function(idx) {
    return this.lessonIdx == idx ? "e" : "c";
  };
  
  update($scope);
  
}]);

