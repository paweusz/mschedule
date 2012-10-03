"use strict";

var msched = angular.module('MSchedule');

msched.controller('ScheduleCtrl', ['$scope', function ($scope) {

  function updateLabels(scope) {
    scope.current = msched.weekdays[scope.index];
  };
  
  function updateLessons(scope) {
    scope.lessons = _.map(msched.lessons[scope.index], function(l) {
      return l != null ? msched.subjects[l] : null;
    });
  };
  
  function update(scope) {
    updateLabels(scope);
    updateLessons(scope);
  };
  
  function getCurrentDayIdx(ts) {
    var weekdaysNum = msched.weekdays.length;
    var dow = ts.getDay();
    if (dow == 0) {
      dow = 7;
    }
    dow--;
    
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
  
  $scope.index = getCurrentDayIdx(new Date());

  $scope.backward = function() {
    this.index = this.index - 1 >= 0 ? this.index - 1 : msched.weekdays.length - 1;
    update(this);
  };
  
  $scope.forward = function() {
    this.index = this.index + 1 < msched.weekdays.length ? this.index + 1 : 0;
    update(this);
  };
  
  update($scope);
  
}]);

