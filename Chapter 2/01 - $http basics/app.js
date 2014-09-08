angular.module("myApp", [])
    .controller("myCtrl", ['$scope', '$http', function ($scope, $http) {
        $http.get('data.json').success(function (data, status, headers, config) {
            $scope.data = data;
            console.log(status); // status headers
            console.log(config); // show object
        })
    }]);