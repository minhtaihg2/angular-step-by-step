'use strict'

var app = angular.module("myApp", []);
app.controller("myCtrl", ['$scope', function ($scope, $log) {
    $scope.greeting = "World";
}]);


// directive 1

app.directive("myDirectiveOne", function () {
    return {
        restrict: 'E', // khai báo directive có dạng Element (C : class,A : attributes,M : comment)
        template: '<p>Hello world</p>', // render template
        replace: true // loại bỏ thẻ directive đi
    }
});

// directive 2 :

app.directive("myDirectiveTwo", function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div><p>Hello {{greeting}}</p></div>',
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
        scope: {
            user: '@someAttrs',
            company: '@'
        },
        controller: function ($scope) {
            $scope.name = $scope.user;
        },
        link: function (scope, ele, attrs) {
            console.log(scope.user);
            console.log(scope.company);
        }
    }
});
app.directive("paper", function () {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        template: '<div><div ng-hide="isDisabled">' +
            '<button class="btn btn-primary" ng-click="disable()">Click me</button>' +
            '<p>Directive {{action}}</p>' +
            '</div>' +
            '<p ng-show="isDisabled">$timeout : {{count}}</p>' +
            '<p ng-transclude></p></div>',
        controller: function ($scope, $timeout, $log) {
            var myTime;
            $scope.action = "Controller";
            $scope.isDisabled = false;
            $scope.disable = function () {
                $scope.isDisabled = true;
                $scope.count = 1;
                myTime = setInterval(function () {
                    $scope.$apply(function () {
                        $scope.count += 1;
                    });
                    if ($scope.count == 6) {
                        clearInterval(myTime);
                    }
                }, 1000);
                $timeout(function () {
                    $scope.isDisabled = false;
                }, 5000);
            };

        }
    }
});

