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
]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('index', {
                controller: 'MainCtrl',
                abstract: true,
                url: '',
                templateUrl: 'views/main.html'
            })
            .state('index.home', {
                url: '/home',
                templateUrl: 'views/home.html'
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
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            })

            /*    Admin   */


            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/admin/dashboard.html',
                controller: 'dashCtrl',
                accessLevel: window.userCan.accessUser
            })

            .state('admin', {
                url: '/admin',
                templateUrl: 'views/admin/admin.html',
                controller: 'adminCtrl',
                accessLevel: window.userCan.accessAdmin
            });

    }]).run(['$rootScope', '$state', 'appConfig', 'dataStorage', 'amMoment', 'auth', '$log',
    function ($rootScope, $state, appConfig, dataStorage, amMoment, auth, $log) {
        $rootScope.$on('$stateChangeStart', function (event, to, toParams, fromState) {

            if (auth.getUser() === null) {
                auth.pendingStateChange = {
                    to: to,
                    toParams: toParams
                };
            }
            console.log('to.accessLevel :',to.accessLevel);
            if (to.accessLevel === undefined || auth.authorize(to.accessLevel)) {
                //TODO action
            } else {
                event.preventDefault();
                $state.go('login');
            }

        });

        $rootScope.$on('unauthorize', function () {
            //TODO authorize
        });

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