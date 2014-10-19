angular.module("myApp",[])
	.controller("myCtrl",['$scope',function($scope){
		$scope.greeting = "World";
        var dayNames = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
        $scope.getDay = dayNames[new Date().getDay() - 1];
	}]);
