/**
 * Created by taipham on 10/24/14.
 */


angular.module('myApp')
    .controller('registerCtrl', ['$scope', 'appConfig', 'getData', 'dataStorage', 'auth', '$log', '$state', '$rootScope', '$auth',
        function ($scope, appConfig, getData, dataStorage, auth, $log, $state, $rootScope, $auth) {
            $scope.signup = function () {
                console.log($scope.displayName, $scope.email, $scope.password)
                $auth.signup({
                    displayName: $scope.displayName,
                    email: $scope.email,
                    password: $scope.password
                }).catch(function (response) {
                    console.log(response);
                });
            };
        }]);