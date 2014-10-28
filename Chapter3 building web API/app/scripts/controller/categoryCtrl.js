/**
 * Created by taipham.it on 8/18/2014.
 */

'use strict'

angular.module('myApp')
    .controller('categoryCtrl', ['$scope', 'getData', '$stateParams', 'dataStorage', '$location',
        function ($scope, getData, $stateParams, dataStorage, $location) {
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


            getData.getDataId('category', _id).then(function (data) {
                $scope.categories = data;
            });

            getData.getDataTable('posts').then(function (data) {
                postForCategories(data);
                console.log('category page :', data);
            });

        }]);
