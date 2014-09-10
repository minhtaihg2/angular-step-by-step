angular.module("myApp", [])
    .controller("parentCtrl", ['$scope', function ($scope) {

        // ví dụ này để cho thấy rằng sự khác nhau của từng giá trị scope trong 1 controller
        $scope.someValue = 'Hello...';
        $scope.callAction = function () {
            $scope.someValue = 'Hello am parent OK';
        }
    }])
    .controller("childCtrl", ['$scope', function ($scope) {
        $scope.callParent = function () {
            $scope.someValue = 'Hello am child OK';
        }
    }])
    .controller("parentCtrl2", ['$scope', function ($scope) {
        // ví dụ này để kế thừa các scope qua các controller hierarchy
        $scope.data = {
            someValue: 'Hello...'
        };
        $scope.callAction = function () {
            $scope.data.someValue = 'Hello am parent OK';
        }
    }])
    .controller("childCtrl2", ['$scope', function ($scope) {
        $scope.callParent = function () {
            $scope.data.someValue = 'Hello am child OK';
        }
    }]);