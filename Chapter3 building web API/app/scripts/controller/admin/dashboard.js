/**
 * Created by taipham on 10/22/14.
 */


angular.module('myApp')
    .controller('dashCtrl', ['$scope', '$http', 'appConfig', 'ServiceResource', 'getData', 'dataStorage', 'auth', '$log', '$loading', '$rootScope',
        function ($scope, $http, appConfig, ServiceResource, getData, dataStorage, auth, $log, $loading, $rootScope) {
            var loadData = function () {
                $scope.checkPost = false; // check post size = 0 show text
                var _idUser;

                $loading.start('dash');
                if (angular.isUndefined($rootScope.userData)) {
                    _idUser = $rootScope.userData;
                } else {

                    $http.get('http://localhost:3000/api/me').success(function (data) {
                        _idUser = data._id;
                    }).error(function (err) {
                        console.log(err);
                    })
                };


                if (dataStorage.Posts.size() > 0) {
                    $scope.posts = dataStorage.Posts.all();
                    $loading.finish('dash');
                    $scope.checkPost = true;
                } else {
                    getData.getDataTable('posts').then(function (data) {
                        $scope.posts = data;
                        dataStorage.Posts.addAll(data);
                        $loading.finish('dash');
                        $scope.checkPost = true;
                    }, function (err) {
                        // TODO if error
                    });
                }
            }
            loadData();
        }]);