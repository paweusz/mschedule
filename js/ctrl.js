"use strict";

angular.module('MSchedule').controller('ScheduleCtrl', ['$scope', 'Domain', function ($scope, Domain) {

  function getDow(ts) {
    var dow = ts.getDay();
    if (dow == 0) {
      dow = 7;
    }
    return dow - 1;
  }
  
  function getCurrentDayIdx(ts) {
    var weekdaysNum = Domain.weekdays.length;
    var dow = getDow(ts);
    
    if (dow > weekdaysNum) {
      return 0;
    }

    var idx = dow;    
    var lessonsNum = Domain.lessons[dow].length;
    var timeslot = Domain.timeslots[lessonsNum - 1];
    if (Domain.hmToDate(ts.getHours(), ts.getMinutes()) > timeslot.end) {
      if (dow + 1 >= weekdaysNum) {
        idx = 0;
      } else {
        idx = dow + 1;
      }
    }    

    return idx;
  };

  function getCurrentLessonIdx(ts) {
    var weekdaysNum = Domain.weekdays.length;
    var dow = getDow(ts);
    
    if (dow > weekdaysNum) {
      return -1;
    }

    var idx = -1;
    var lessons = Domain.lessons[dow];
    var timeslots = Domain.timeslots;
    var relTs = Domain.hmToDate(ts.getHours(), ts.getMinutes());
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
    $scope.current = Domain.weekdays[$scope.weekdayIdx];
  };
  
  function updateLessons() {
    $scope.lessons = _.map(Domain.lessons[$scope.weekdayIdx], function(l) {
      return l != null ? Domain.subjects[l] : null;
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
    $scope.weekdayIdx = $scope.weekdayIdx - 1 >= 0 ? $scope.weekdayIdx - 1 : Domain.weekdays.length - 1;
    update();
  };
  
  $scope.forward = function() {
    $scope.weekdayIdx = $scope.weekdayIdx + 1 < Domain.weekdays.length ? $scope.weekdayIdx + 1 : 0;
    update();
  };
  
  $scope.theme = function(idx) {
    return $scope.lessonIdx == idx ? "e" : "c";
  };
  
  $scope.setSelectedLesson = function(idx) {
    var weekdayLessons = Domain.lessons[$scope.weekdayIdx];
    var l = weekdayLessons[idx];
    var tslot = Domain.timeslots[idx];
    $scope.subject = l != null ? Domain.subjects[l] : null;
    
    function formatMinute(minute) {
      var s = "";
      if (minute != null) {
        s = minute.toString();
        if (s.length == 1) {
          s += "0";
        }
      }
      return s;
    };
    $scope.startTime = tslot.getStartHour() + ":" + formatMinute(tslot.getStartMinute());
    $scope.endTime = tslot.getEndHour() + ":" + formatMinute(tslot.getEndMinute());
  };
  
  $scope.subject = null;
  
  update($scope);
  
}]);

