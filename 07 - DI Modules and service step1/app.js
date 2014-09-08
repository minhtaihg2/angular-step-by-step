'use strich'

var app = angular.module("myApp", [
    'notifications'
]);
app.run(['$rootScope', function ($rootScope) {
    $rootScope.timeUp = new Date();
}])

//registering providers - getting a module instance

angular.module("myApp")
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
            getType: 'Car get ready step 1!!!'
        }
    })