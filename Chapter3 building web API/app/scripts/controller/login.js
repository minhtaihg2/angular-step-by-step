/**
 * Created by taipham on 10/22/14.
 */


angular.module('myApp')
    .controller('loginCtrl', ['$scope', 'appConfig', 'getData', 'dataStorage', 'auth', '$log', '$state', '$rootScope', '$auth',
        function ($scope, appConfig, getData, dataStorage, auth, $log, $state, $rootScope, $auth) {

            $scope.authenticate = function (provider) {
                auth.authenticate(provider, function (err, resp) {
                    console.log('resp login social: ' + provider, resp);
                })

            };
            $scope.login = function (user) {
                auth.login(user, function (err, resp) {
                    console.log('resp user login : ', resp);
                })
            };

        }]);