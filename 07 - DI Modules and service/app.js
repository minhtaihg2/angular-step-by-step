'use strich'

angular.module("myApp", [
    'notifications'
])
    .run(['$rootScope', function ($rootScope) {
        $rootScope.timeUp = new Date();
    }])
    .controller("myCtrl", ['$scope', 'Car', function ($scope, Car) {
            Car.start();
    }])
    .factory("Car", function ($log, getNotification) {
        return {
            start: function () {
                $log.info('Starting...' + getNotification.getType);
            }
        }
    })

angular.module("notifications", [])
    .factory("getNotification", function () {
        return {
            getType: 'Car get ready!!!'
        }
    })