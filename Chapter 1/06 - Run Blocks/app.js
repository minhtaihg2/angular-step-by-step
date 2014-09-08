/**
 * Created by TaiPham.IT on 9/8/2014.
 */


angular.module("myApp", [])
    .run(['$rootScope', function ($rootScope) {
        $rootScope.timeUp = new Date();
    }]);