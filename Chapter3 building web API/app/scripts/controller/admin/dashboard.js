/**
 * Created by taipham on 10/22/14.
 */


angular.module('myApp')
    .controller('dashCtrl', ['$scope', '$http', 'appConfig', 'ServiceResource', 'getData', 'dataStorage', 'auth', '$log',
        function ($scope, $http, appConfig, ServiceResource, getData, dataStorage, auth, $log) {
            console.log('Login : ', auth.isLogin(), auth.getUser());
        }]);