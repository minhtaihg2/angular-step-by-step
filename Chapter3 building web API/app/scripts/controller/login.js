/**
 * Created by taipham on 10/22/14.
 */


angular.module('myApp')
    .controller('loginCtrl', ['$scope', '$http', 'appConfig', 'ServiceResource', 'getData', 'dataStorage', 'auth', '$log',
        function ($scope, $http, appConfig, ServiceResource, getData, dataStorage, auth, $log) {
            $log.info('Start login...');
            $scope.login = function (user) {
               auth.login(user,function(err,userData){
                   console.log(userData);
               })
            }
        }]);