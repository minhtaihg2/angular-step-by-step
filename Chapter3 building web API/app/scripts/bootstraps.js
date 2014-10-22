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
    $urlRouterProvider.otherwise('/index.html');
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('index', {
            controller: 'MainCtrl',
            url: '/index.html',
            templateUrl: 'views/main.html'
        })
        .state('category', {
            url: '/category.html',
            templateUrl: 'views/category.html',
            controller: 'categoryCtrl'
        })
        .state('detail', {
            url: '/detail/:id',
            templateUrl: 'views/detail-products.html',
            controller: 'DetailCtrl'
        })
}]).run(['$rootScope', '$state', 'appConfig', 'dataStorage','amMoment', function ($rootScope, $state, appConfig, dataStorage,amMoment) {

    amMoment.changeLocale('vi'); // setup time local viet nam


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