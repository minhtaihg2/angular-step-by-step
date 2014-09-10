angular.module("myApp",[])
	.controller("myCtrl",['$scope',function($scope){
        var stringData = "";
        var objectData = {};

        var getValue = function(c){
            return c || 10; //  nếu C có giá trị gán kết quả trả về là c không mặc định khởi tạo = 10
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
            return value != null && typeof value == 'string';  // && cả 2 điều kiện đều đúng
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
            return value >= 20 && value != null && (value = 20); // check true hết các giá trị sau đó gán giá trị
        };

        console.log(numberChange(22));
        console.log(numberChange2(22));
	}]);