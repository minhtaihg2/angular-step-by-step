angular.module("myApp", [])
    .controller("myCtrl", ['$scope', '$http', function ($scope, $http) {
        $http({
            method : 'GET',
            url : 'http://localhost:3000/posts/54291e70048d957e023a305d'
        }).success(function (data, status, headers, config) {
           // $scope.data = data;
            console.log('data :',data);
            console.log(status); // status headers
            console.log(config); // show object
        }, function (data, status, headers, config) {
            throw new Error('something went wrong!!!');
        });
    }]);