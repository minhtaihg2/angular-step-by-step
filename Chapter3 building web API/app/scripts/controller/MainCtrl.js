/**
 * Created by taipham.it on 8/18/2014.
 */

'use strict'

angular.module('myApp')
    .controller('MainCtrl', ['$scope', '$http', 'appConfig', 'ServiceResource', 'getData', 'dataStorage', 'auth', '$log',
        function ($scope, $http, appConfig, ServiceResource, getData, dataStorage, auth, $log) {
            $log.info('Start main...');
            getData.getDataTable('posts').then(function (data) {
               $scope.posts = data;
            }, function (err) {
               // TODO if error
            });
        }]);
