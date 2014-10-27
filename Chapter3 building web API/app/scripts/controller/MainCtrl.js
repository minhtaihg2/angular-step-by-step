/**
 * Created by taipham.it on 8/18/2014.
 */

'use strict'

angular.module('myApp')
    .controller('MainCtrl', ['$scope', '$http', 'appConfig', 'ServiceResource', 'getData', 'dataStorage', 'auth', '$log', '$loading',
        function ($scope, $http, appConfig, ServiceResource, getData, dataStorage, auth, $log, $loading) {

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

            /*
             $loading.start('posts');
             console.log('get Data main:', dataStorage.Comments.all());
             if (dataStorage.Posts.size() > 0) {
             $scope.posts = dataStorage.Posts.all();
             $loading.finish('posts');
             } else {
             getData.getDataTable('posts',2,1).then(function (data) {
             $scope.posts = data;
             dataStorage.Posts.addAll(data);
             $loading.finish('posts');
             }, function (err) {
             // TODO if error
             });
             }*/

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

        }]);
