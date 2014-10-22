/**
 * Created by taipham.it on 8/18/2014.
 */

'use strict'

angular.module('myApp', [
    'ui.router',
    'ngResource',
    'ngAnimate',
    'ngCollection',
    'LocalStorageModule',
    'angularMoment'  // Moment.JS directives for Angular.JS
]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('index', {
            controller: 'MainCtrl',
            abstract : true,
            url: '',
            templateUrl: 'views/main.html'
        })
        .state('index.home',{
            url : '/home',
            templateUrl : 'views/home.html'
           /* controller : 'homeCtrl'*/
        })
        .state('index.category', {
            url: '/category/:id/:name.html',
            templateUrl: 'views/category.html',
            controller: 'categoryCtrl'
        })
        .state('index.detail', {
            url: '/chi-tiet/:id.html',
            templateUrl: 'views/detail.html',
            controller: 'DetailCtrl'
        })
        .state('login',{
            url : '/login',
            templateUrl : 'views/login.html',
            controller:'loginCtrl'
        })

        /*    Admin   */



        .state('dashboard',{
            url : '/dashboard',
            templateUrl : 'views/admin/dashboard.html',
            controller:'dashCtrl'
        })
}]).run(['$rootScope', '$state', 'appConfig', 'dataStorage','amMoment', function ($rootScope, $state, appConfig, dataStorage,amMoment) {

    amMoment.changeLocale('vi'); // setup time local viet nam
    $rootScope.$state = $state;

    $rootScope.goToPage = function (state, id) { // setup url go to page
        if (!id) {
            $state.go(state);
        } else {
            $state.go(state, id);
        }
    };

}]).constant('appConfig', {
    apiHost: 'http://localhost:3000' // setup url api server
}).filter('highlight', function ($sce) { // highlight text when search
    return function (text, phrase) {
        if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
            '<span class="highlighted">$1</span>')

        return $sce.trustAsHtml(text)
    }
});