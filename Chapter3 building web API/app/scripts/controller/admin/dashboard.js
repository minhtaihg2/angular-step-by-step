/**
 * Created by taipham on 10/22/14.
 */


angular.module('myApp')
    .controller('dashCtrl', ['$scope', '$http', 'appConfig', 'ServiceResource', 'getData', 'dataStorage', 'auth', '$log', '$loading', '$rootScope',
        function ($scope, $http, appConfig, ServiceResource, getData, dataStorage, auth, $log, $loading, $rootScope) {
            var posts = [];
            var _idUser;
            var checkPost = function (data, _id) {
                var length = data.length;
                for (var i = 0; i < length; i++) {

                    if (data[i].Author._id == _id) {
                        posts.push(data[i]);
                    }
                }
                if (posts.length == 0) {
                    $scope.checkPost = true;
                }
                return posts;
            }
            var loadData = function () {
                var me = this;
                $scope.checkPost = false; // check post size = 0 show text
                $loading.start('dash');
                if (!angular.isUndefined($rootScope.userData)) {
                    _idUser = $rootScope.userData._id;
                } else {
                    $http.get('http://localhost:3000/api/me').success(function (data) {
                        _idUser = data._id;
                    }).error(function (err) {
                        console.log(err);
                    })
                }


                getData.getDataTable('posts', null, null, "content").then(function (data) {
                    $scope.posts = checkPost(data, _idUser);
                    dataStorage.Posts.addAll(data);
                    $loading.finish('dash');

                }, function (err) {
                    // TODO if error
                });

            }
            loadData();
        }]);