/*global angular:false, $:false*/
(function () {
  "use strict";
  angular.module('MSchedule', []);

  //stop jQM from auto initialising
  $(document).on("mobileinit",function() {
    $.mobile.autoInitializePage = false;
  });
    
}());

