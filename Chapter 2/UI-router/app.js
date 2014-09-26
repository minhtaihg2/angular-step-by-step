/**
 * Created by taipham on 9/26/14.
 */

var app = angular.module('myApp', [
    'ui.router'
]).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home/main');
    $stateProvider
        .state('home', {
            abstract: true, // khai báo abstract là để định ngĩa rằng có state con khi hiển thị (ngĩa là còn có 1 ui-view trong )
            url: '', // mặc đinh '' để xác định nó sẽ hiển thị view (view mặc định lấy từ otherwise)
            controller: 'HomeCtrl', // controller xu ly cho views
            templateUrl: 'views/home.html'
        })
        .state('home.list', {
            url: '/detail',
            controller: 'listCtrl',
            templateUrl: 'views/list.html'
        })
        .state('books', {
            url: '/books',
            controller: 'BookCtrl',
            templateUrl: 'views/books.html'
        })
        .state('home.main', {
            url: '/home/main',
            templateUrl: 'views/main.html'
        })
        .state('home.detail', {
            url: '/home/detail/:id',
            templateUrl: 'views/detail.html',
            controller: 'detailCtrl'
        })
        .state('skills', {
            url: '/skill',
            templateUrl: 'views/skill.html'
        })


}]).run(['$rootScope', '$state', function ($rootScope, $state) {
    $rootScope.greet = 'AngularJS ui-router';
    $rootScope.goToPage = function (state, id) {
        if (id) {
            $state.go(state, id);
        } else {
            $state.go(state)
        }
    }
}])

app.controller('HomeCtrl', ['$scope', '$state', function ($scope, $stateParams) {
    console.log(($stateParams.current.url).replace('/', ''));
}]);

app.controller('BookCtrl', ['$scope', '$log', function ($scope, $log) {

}]);

app.controller('listCtrl', ['$scope', '$log', function ($scope, $log) {

}]);

app.controller('detailCtrl', ['$scope', '$log', '$stateParams', function ($scope, $log, $stateParams) {
        var _id = $stateParams.id;
        $log.info('id : ',_id);
        $scope.IdProducts = _id;
}]);