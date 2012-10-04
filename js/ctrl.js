/*global angular:false, _:false*/
(function () {
  "use strict";

  angular.module('MSchedule').controller('ScheduleCtrl', ['$scope', 'Domain', function ($scope, Domain) {

    function getDow(ts) {
      var dow = ts.getDay();
      if (dow === 0) {
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
    }

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
        var ts0 = i === 0 ? timeslots[0].start : timeslots[i - 1].end;
        var ts1 = timeslots[i].end;
        if ((ts0 <= relTs) && (relTs < ts1)) {
          idx = i;
          break;
        }
      }
      
      return idx;
    }
    
    //--------------------------------------------------------------------------
    
    var ts = new Date();
    var currentWeekdayIdx = getCurrentDayIdx(ts);
    var currentLessonIdx = getCurrentLessonIdx(ts);

    $scope.weekdays = _.map(Domain.weekdays, function(weekday, idx) {
      return {
        id: weekday.id,
        name: weekday.name,
        lessons: _.map(Domain.lessons[idx], function(l) {
          return l !== null ? Domain.subjects[l] : null;
        }),
        nextId: idx + 1 < Domain.weekdays.length ? Domain.weekdays[idx + 1].id : Domain.weekdays[0].id,
        prevId: idx > 0 ? Domain.weekdays[idx - 1].id : Domain.weekdays[Domain.weekdays.length - 1].id,
        idx: idx,
        lessonIdx: idx === currentWeekdayIdx ? currentLessonIdx : -1
      };
    });

    $scope.theme = function(weekdayIdx, lessonIdx) {
      return currentWeekdayIdx === weekdayIdx && currentLessonIdx === lessonIdx ? "e" : "c";
    };
    
    $scope.setSelectedLesson = function(weekdayIdx, lessonIdx) {
      var weekdayLessons = Domain.lessons[weekdayIdx];
      var l = weekdayLessons[lessonIdx];
      var tslot = Domain.timeslots[lessonIdx];
      $scope.subject = l !== null ? Domain.subjects[l] : null;
      
      function formatMinute(minute) {
        var s = "";
        if (minute !== null) {
          s = minute.toString();
          if (s.length === 1) {
            s += "0";
          }
        }
        return s;
      }
      $scope.startTime = tslot.getStartHour() + ":" + formatMinute(tslot.getStartMinute());
      $scope.endTime = tslot.getEndHour() + ":" + formatMinute(tslot.getEndMinute());
    };
    
    window.location.hash = Domain.weekdays[currentWeekdayIdx].id;
  }]);
}());

  
