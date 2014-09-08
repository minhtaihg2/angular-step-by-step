angular.module("myApp",[])
	.controller("myCtrl",['$scope',function($scope){
		
	}])
	.controller("myCtrlParent",['$scope',function($scope){
		$scope.name = "Nodejs";
	}]);

	// Mặc định trong angular khi controller định ngĩa ra thì model của controller đó không tồn tại thì nó sẽ tìm kiếm
	// ở mức level cao hơn,cho đến khi tìm thấy,khi không tìm thấy mặc định sẽ không hiển thị model