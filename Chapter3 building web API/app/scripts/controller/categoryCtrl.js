/**
 * Created by taipham.it on 8/18/2014.
 */

'use strict'

angular.module('myApp')
    .controller('categoryCtrl', ['$scope', 'getData', '$stateParams', 'dataStorage','$location',
        function ($scope, getData, $stateParams, dataStorage,$location) {
            var _id = $stateParams.id;

            var postForCategories = function (data) {
                var length = data.length;
                for (var i = 0; i < length; i++) {
                    if (data[i].Category._id == _id) {
                        $scope.postForCategory.push(data[i]);
                    }
                }
            };


            $scope.postForCategory = [];

            if (dataStorage.Categories.size() > 0) {
                $scope.categories = dataStorage.Categories.get(_id);
            } else {
                getData.getDataId('category', _id).then(function (data) {
                    $scope.categories = data;
                });
            }

            if (dataStorage.Posts.size() > 0) {
                var data = dataStorage.Posts.all();
                postForCategories(data);
            } else {
                getData.getDataTable('posts').then(function (data) {
                    postForCategories(data);
                });
            }

        }])
