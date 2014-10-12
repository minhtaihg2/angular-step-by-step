angular.module("myApp", [])
    .controller("myCtrl", ['$scope', '$http', '$log', function ($scope, $http, $log) {

        $log.info('start...');

        $scope.login = function (user) {
            $log.info(user);
            $http({
                withCredentials: false,
                method: 'POST',
                url: 'http://127.0.0.1:3000/login',
                data : JSON.stringify(user),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data) {
                $log.info(data);
            }, function (err) {
                $log.info(err);
            });
        };

    }]);