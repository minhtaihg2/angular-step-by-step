angular.module("myApp", [])
    .controller("myCtrl", ['$scope', '$http', '$log', function ($scope, $http, $log) {

        $log.info('start...');
        $http({
            method: 'GET',
            url: 'data.json'
        }).success(function (data) {
            $scope.data = data;

        }, function (err) {

        });
    }]);