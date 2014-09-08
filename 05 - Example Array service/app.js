/**
 * Created by TaiPham.IT on 9/8/2014.
 */


angular.module("myApp", [])
    .controller("myCtrl", ['$scope', 'ServiceArray', function ($scope, ServiceArray) { // truyền DI ServiceArray vào controller
        $scope.data = {};

        $scope.add = function () { // tạo 1 function add để click lưu giá trị
            ServiceArray.push($scope.data);
            $scope.data = '';
        };

        $scope.getValueArray = function () {
            return ServiceArray.getValues();
        };

        $scope.remove = function (id) {
            ServiceArray.remove(id);
        };

        $scope.edit = function (data) {
            $scope.data = data;
        }
    }])
    .service("ServiceArray", ServiceArray);