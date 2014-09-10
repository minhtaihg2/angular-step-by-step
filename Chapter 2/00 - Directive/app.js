'use strict'

var app = angular.module("myApp", []);
app.controller("myCtrl", ['$scope', function ($scope) {
    $scope.greeting = "World";
}]);


// directive 1

app.directive("myDirectiveOne", function () {
    return {
        restrict: 'E', // khai báo directive có dạng Element (C : class,A : attributes,M : comment)
        template: '<p>Hello world</p>', // render template
        replace : true // loại bỏ thẻ directive đi
    }
});

// directive 2 :

app.directive("myDirectiveTwo", function () {
    return {
        restrict: 'E',
        template: '<p>Hello {{greeting}}</p>',
        controller: function ($scope) {  // tạo 1 controller xử lý dữ liệu
            $scope.greeting = "world"
        }
    }
});

// directive 3
app.directive("myDirectiveTwoScope", function () {
    return {
        restrict: 'E',
        template: '<input type="text" data-ng-model="greet"/><p>Hello {{greet}}</p>',
        controller: function ($scope) {  // tạo 1 controller xử lý dữ liệu
            $scope.greet = "world"
        }
      /*  ,
        scope : {}*/

         // cô lập phạm vi hoạt động của từng scope trong directive
    }
});



// directive 4

app.directive("myDirectiveThree", function () {
    return {
        restrict: 'E',
        template: ' <input type="text" ng-model="name" placeholder="enter name"/> <p>Hello {{name}}</p>',
        scope : {
            user : '@someAttrs',
            company : '@'
        },
        controller : function($scope){
            $scope.name = $scope.user;
        },
        link : function(scope,ele,attrs){
            console.log(scope.user);
            console.log(scope.company);
        }
    }
});

