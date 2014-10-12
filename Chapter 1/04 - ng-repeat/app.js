angular.module("myApp", [])
    .controller("myCtrl", ['$scope', function ($scope) {
        $scope.date = new Date();
        console.log($scope.date);
        $scope.data = [
            {
                "firstName": "John",
                "lastName": "Kenny",
                "Phone": "+84 184 181"

            },
            {
                "firstName": "Pham",
                "lastName": "Tai",
                "Phone": "+43 310 210"
            },
            {
                "firstName": "Tran",
                "lastName": "Khanh",
                "Phone": "+84 234 234"
            },
            {
                "firstName": "Cong",
                "lastName": "Vinh",
                "Phone": "+12 222 121"
            },
            {
                "firstName": "Nguyen",
                "lastName": "Long",
                "Phone": "+52 210 001"
            }
        ];
    }]);