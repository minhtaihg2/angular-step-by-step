/**
 * Created by taipham.it on 8/18/2014.
 */

'use strict'

angular.module('myApp')
    .controller('MainCtrl', ['$scope', '$http', 'appConfig', 'ServiceResource', 'getData', 'dataStorage', 'auth', '$log', '$loading',
        function ($scope, $http, appConfig, ServiceResource, getData, dataStorage, auth, $log, $loading) {
            var loadData = function () {
                $loading.start('posts');
                console.log('get Data main:', dataStorage.Comments.all());
                if (dataStorage.Posts.size() > 0) {
                    $scope.posts = dataStorage.Posts.all();
                    $loading.finish('posts');
                } else {
                    getData.getDataTable('posts').then(function (data) {
                        $scope.posts = data;
                        dataStorage.Posts.addAll(data);
                      $loading.finish('posts');
                    }, function (err) {
                        // TODO if error
                    });
                }
                if (dataStorage.Categories.size() > 0) {
                    $scope.categories = dataStorage.Categories.all();
                } else {
                    getData.getDataTable('category').then(function (data) {
                        $scope.categories = data;
                        dataStorage.Categories.addAll(data);
                    }, function (err) {
                        // TODO if error
                    });
                }

            };

            loadData();

        }]);
