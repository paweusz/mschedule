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
  
  function updateLabels() {
    $scope.current = msched.weekdays[$scope.weekdayIdx];
  };
  
  function updateLessons() {
    $scope.lessons = _.map(msched.lessons[$scope.weekdayIdx], function(l) {
      return l != null ? msched.subjects[l] : null;
    });
    var ts = new Date();
    $scope.lessonIdx = $scope.weekdayIdx == getDow(ts) ? getCurrentLessonIdx(ts) : -1;
  };
  
  function update() {
    updateLabels();
    updateLessons();
  };
  
  $scope.weekdayIdx = getCurrentDayIdx(new Date());

  $scope.backward = function() {
    $scope.weekdayIdx = $scope.weekdayIdx - 1 >= 0 ? $scope.weekdayIdx - 1 : msched.weekdays.length - 1;
    update();
  };
  
  $scope.forward = function() {
    $scope.weekdayIdx = $scope.weekdayIdx + 1 < msched.weekdays.length ? $scope.weekdayIdx + 1 : 0;
    update();
  };
  
  $scope.theme = function(idx) {
    return $scope.lessonIdx == idx ? "e" : "c";
  };
  
  $scope.setSelectedLesson = function(idx) {
    var weekdayLessons = msched.lessons[$scope.weekdayIdx];
    var l = weekdayLessons[idx];
    $scope.subject = l != null ? msched.subjects[l] : null;
    console.log("Subject: " + $scope.subject);
  };
  
  $scope.subject = null;
  
  update($scope);
  
}]);

