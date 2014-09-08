angular.module("myApp", [
    'ngSanitize'
])
    .controller("escaping", ['$scope', function ($scope) {
        $scope.msg = "Hello";
    }]);
