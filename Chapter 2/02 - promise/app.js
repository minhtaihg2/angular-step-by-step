angular.module("myApp", [])
    .controller("myCtrl", ['$scope', 'ServiceHttp', '$log', function ($scope, ServiceHttp, $log) {

        ServiceHttp.getData().then(function (data) {
            $scope.data = data;
        });
    }]);