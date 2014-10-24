/**
 * Created by taipham on 10/22/14.
 */


angular.module('myApp')
    .controller('loginCtrl', ['$scope', 'appConfig', 'getData', 'dataStorage', 'auth', '$log', '$state', '$rootScope', '$auth','$http',
        function ($scope, appConfig, getData, dataStorage, auth, $log, $state, $rootScope, $auth,$http) {

            $scope.authenticate = function (provider) {
                auth.authenticate(provider, function (err, resp) {
                    $http.get('http://localhost:3000/api/me').success(function (data) {
                        $rootScope.userData = data;
                        console.log(data);
                    }).error(function (err) {
                        console.log(err);
                    })
                })

            };
            $scope.login = function (user) {
                auth.login(user, function (err, resp) {
                    $http.get('http://localhost:3000/api/me').success(function (data) {
                        $rootScope.userData = data;
                        console.log(data);
                    }).error(function (err) {
                        console.log(err);
                    })
                })
            };

        }]);