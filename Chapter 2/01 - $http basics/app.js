angular.module("myApp", [])
    .controller("myCtrl", ['$scope', '$http', '$log', function ($scope, $http, $log) {
        /*  $http({
         method : 'GET',
         url : 'data.json'
         }).success(function (data, status, headers, config) {
         $scope.data = data;
         // console.log('data :',data);
         console.log(status); // status headers
         console.log(config); // show object
         }, function (data, status, headers, config) {
         throw new Error('something went wrong!!!');
         });*/
        $log.info('start...');

       $scope.login = function (user) {
            console.log(user);
            $http({
                method: 'POST',
                url: 'http://localhost:3000/login',
                data : user
            }).success(function (data) {
                $log.info(data);
            }, function (err) {
                $log.info(err);
            })
        };

    }]);