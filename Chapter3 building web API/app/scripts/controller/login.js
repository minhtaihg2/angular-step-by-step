/**
 * Created by taipham on 10/22/14.
 */


angular.module('myApp')
    .controller('loginCtrl', ['$scope', 'appConfig', 'getData', 'dataStorage', 'auth', '$log', '$state', '$rootScope', '$auth',
        function ($scope, appConfig, getData, dataStorage, auth, $log, $state, $rootScope, $auth) {

            $scope.authenticate = function (provider) {
                $auth.authenticate(provider);
            };

            $scope.login = function (user) {

                $auth.login({
                    email: user.email,
                    password: user.password
                });

              /*  auth.login(user, function (err, userData) {
                    if (err) {
                        $scope.user = {};
                        $scope.notify = 'Username or password false';
                    } else {
                        if (auth.getBitMask == 1) {
                            $state.go('dashboard');
                        } else {
                            $state.go('admin');
                        }
                    }

                })*/
            };



        }]);