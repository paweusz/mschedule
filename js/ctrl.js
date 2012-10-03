"use strict";

var msched = angular.module('MSchedule');

msched.controller('ScheduleCtrl', ['$scope', function ($scope) {

  $scope.index = 0;

  function updateLabels(scope) {
    scope.current = msched.weekdays[scope.index].name;
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

