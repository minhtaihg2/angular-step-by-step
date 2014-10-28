/**
 * Created by taipham.it on 8/18/2014.
 */

'use strict'

angular.module('myApp')
    .controller('MainCtrl', ['$scope', '$http', 'appConfig', 'ServiceResource', 'getData', 'dataStorage', 'auth', '$log', '$loading', 'Restangular',
        function ($scope, $http, appConfig, ServiceResource, getData, dataStorage, auth, $log, $loading, Restangular) {

            $scope.totalPosts = 0;
            $scope.postPerPage = 5; // this should match however many results your API puts on one page
            $scope.pageChanged = function (newPage) {
                getResultsPage(newPage);
                $loading.start('posts');
            };


            function getResultsPage(pageNumber) {

                // this is just an example, in reality this stuff should be in a service

                getData.getDataTable('posts', 2, pageNumber).then(function (data) {
                    $scope.posts = data;
                    //$scope.totalPosts = data.Count;
                    $loading.finish('posts');
                }, function (err) {
                    // TODO if error
                    console.log(err);
                });
            }

            if (dataStorage.Categories.size() > 0) {
                $scope.categories = dataStorage.Categories.all();
            } else {
                var filters = [
                    {
                        name: 'public',
                        equals: '1'
                    }
                ];
                var filter = JSON.stringify(filters);

                getData.getDataTable('category').then(function (data) {
                    $scope.categories = data;
                    dataStorage.Categories.addAll(data);
                }, function (err) {
                    // TODO if error
                });
            }

            Restangular.all("sessions").getList().then(function (sessions) {
                console.log('sessions :', sessions);
            });
            Restangular.one("courses", '544f198b2b4beba557bf83b9').get().then(function (data) {
                console.log('data courses 1 :', data)
            });
        }]);
