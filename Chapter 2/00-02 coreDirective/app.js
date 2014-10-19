/**
 * Created by taipham on 10/19/14.
 */

var myApp = angular.module('myApp', []);

myApp.controller('mainCtrl', ['$scope', function ($scope) {
    $scope.todos = [
        { action: "Get groceries", complete: false },
        { action: "Call plumber", complete: false },
        { action: "Buy running shoes", complete: true },
        { action: "Buy flowers", complete: false },
        { action: "Call family", complete: false }
    ];
    $scope.buttonNames = ["Red", "Green", "Blue"];


    $scope.settings = {
        Rows: "Red",
        Columns: "Green"
    };

}]);
