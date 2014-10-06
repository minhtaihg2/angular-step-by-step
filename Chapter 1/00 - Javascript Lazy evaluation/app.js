angular.module("myApp",[])
	.controller("myCtrl",['$scope',function($scope){
        var stringData = "";
        var objectData = {};

        var getValue = function(c){
            return c || 10; 
        };

        console.log(getValue(5));
        console.log(getValue());
        var isString = function (value) {

            if (value != null && typeof value == 'string') {
                return true
            } else {
                return false;
            }
        };

        var isString2 = function (value) {
            return value != null && typeof value == 'string'; 
        };


        console.log(isString(stringData));
        console.log(isString2(stringData));
        console.log('===========');

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