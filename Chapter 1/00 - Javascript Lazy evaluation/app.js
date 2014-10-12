angular.module("myApp",[])
	.controller("myCtrl",['$scope',function($scope){
        var stringData = "";
        var objectData = {};

        var getValue = function(c){
            return c || 10; // tra ve gia tri cua c neu khong ton tai gan gia tri la 10
        };

        console.log(getValue(5));
        console.log(getValue());

        // kiem tra gia tri co phai kieu "string khong? cach 1"
        var isString = function (value) {

            if (value != null && typeof value == 'string') {
                return true
            } else {
                return false;
            }
        };
        // Kiem tra gia tri kieu string pass cach 2 - uu tien
        var isString2 = function (value) {
            return value != null && typeof value == 'string'; 
        };


        console.log(isString(stringData));
        console.log(isString2(stringData));
        console.log('===========');


        // cach lay gia tri

        var numberChange = function (value) {
            if (value != null && value >= 20) {
                return 20;
            }
        };
        var numberChange2 = function (value) {
            return value >= 20 && value != null && (value = 20); 
        };

        console.log(numberChange(22));
        console.log(numberChange2(22));
	}]);