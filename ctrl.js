"use strict";

var msched = angular.module('MSchedule', []);

msched.controller('ScheduleCtrl', ['$scope', function ($scope) {
  $scope.previous = "Friday";
  $scope.next = "Tuesday";
}]);

