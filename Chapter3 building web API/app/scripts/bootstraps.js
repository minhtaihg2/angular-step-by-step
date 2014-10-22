/**
 * Created by taipham.it on 8/18/2014.
 */

'use strict'

angular.module('myApp', [
    'ui.router',
    'ngResource',
    'ngAnimate',
    'ngCollection',
    'LocalStorageModule'
]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/index.html');
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('index', {
            controller: 'MainCtrl',
            url: '/index.html',
            templateUrl: 'views/main.html'
        })
        .state('discovery', {
            url: '/discovery.html',
            templateUrl: 'views/discovery.html',
            controller: 'DiscoveryCtrl'
        })
        .state('detail', {
            url: '/detail/:id',
            templateUrl: 'views/detail-products.html',
            controller: 'DetailCtrl'
        })
}]).run(['$rootScope', '$state', 'appConfig', 'dataStorage', function ($rootScope, $state, appConfig, dataStorage) {

    $rootScope.goToPage = function (state, id) {
        if (!id) {
            $state.go(state);
        } else {
            $state.go(state, id);
        }
    };

}]).constant('appConfig', {
    apiHost: 'http://localhost:3000'
}).filter('highlight', function ($sce) {
    return function (text, phrase) {
        if (phrase) text = text.replace(new RegExp('(' + phrase + ')', 'gi'),
            '<span class="highlighted">$1</span>')

        return $sce.trustAsHtml(text)
    }
});