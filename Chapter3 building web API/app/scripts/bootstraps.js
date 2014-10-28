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
    'angularMoment',  // Moment.JS directives for Angular.JS
    'satellizer',
    'mgcrea.ngStrap',
    'darthwade.dwLoading',
    'textAngular',
    'restangular'
]).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', '$authProvider', 'RestangularProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $authProvider, RestangularProvider) {
        $urlRouterProvider.otherwise('/home');
        // $locationProvider.html5Mode(true).hashPrefix('!');
        $stateProvider
            .state('index', {
                controller: 'MainCtrl',
                abstract: true,
                url: '',
                templateUrl: 'views/main.html'
            })
            .state('index.home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'homeCtrl'
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
            .state('register', {
                url: '/register',
                templateUrl: 'views/register.html',
                controller: 'registerCtrl'
            })

            /*    Admin   */


            .state('profile', {
                url: '/profile',
                templateUrl: 'views/admin/profile.html',
                controller: 'profileCtrl'
            })
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
                accessLevel: window.userCan.accessUser
            });


        // Social


        $authProvider.loginOnSignup = true;
        $authProvider.loginRedirect = '/home';
        $authProvider.logoutRedirect = '/home';
        $authProvider.signupRedirect = '/home';
        $authProvider.loginUrl = 'http://localhost:3000/auth/login';
        $authProvider.signupUrl = 'http://localhost:3000/auth/signup';
        $authProvider.loginRoute = 'http://localhost:3000/login';
        $authProvider.signupRoute = 'http://localhost:3000/signup';
        $authProvider.tokenName = 'token';
        $authProvider.tokenPrefix = 'satellizer'; // Local storage name prefix
        $authProvider.unlinkUrl = 'http://localhost:3000/auth/unlink/';

        $authProvider.google({
            clientId: '643552307041-cqbbju17fshu7q3ch6r0lrls1gmqqppv.apps.googleusercontent.com'
        });
        $authProvider.facebook({
            clientId: '873238899366421'
        });
        $authProvider.google({
            url: 'http://localhost:3000/auth/google',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
            scope: ['profile', 'email'],
            scopePrefix: 'openid',
            scopeDelimiter: ' ',
            requiredUrlParams: ['scope'],
            optionalUrlParams: ['display'],
            display: 'popup',
            type: '2.0',
            popupOptions: { width: 452, height: 633 }
        });
        $authProvider.facebook({
            url: 'http://localhost:3000/auth/facebook',
            authorizationEndpoint: 'https://www.facebook.com/dialog/oauth',
            redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host + '/',
            scope: 'email',
            scopeDelimiter: ',',
            requiredUrlParams: ['display', 'scope'],
            display: 'popup',
            type: '2.0',
            popupOptions: { width: 481, height: 269 }
        });


        RestangularProvider.setBaseUrl('http://vsoft.vn:8888/api/');

        RestangularProvider.setRestangularFields({
            id: '_id.$oid',
            cache: true
        });


        RestangularProvider.setRequestInterceptor(function (elem, operation, what) {

            if (operation === 'put') {
                elem._id = undefined;
                return elem;
            }
            return elem;
        })


        // interceptor

        var interceptor = function ($q, $rootScope) {
            return {
                'response': function (resp) {
                    return resp;
                },
                'responseError': function (rejection) {
                    switch (rejection.status) {
                        case 401 :
                            $rootScope.$broadcast('auth:loginRequire');
                            break;
                        case 403 :
                            $rootScope.$broadcast('auth:forbidden');
                            break;
                        case 404 :
                            $rootScope.$broadcast('page:not found');
                            break;
                        case 500 :
                            $rootScope.$broadcast('server:error');
                            break;

                    }
                    return $q.reject(rejection);
                }
            }
        };
        $httpProvider.interceptors.push(interceptor);

    }]).run(['$rootScope', '$state', 'appConfig', 'dataStorage', 'amMoment', 'auth', '$log', '$auth', '$http',
    function ($rootScope, $state, appConfig, dataStorage, amMoment, auth, $log, $auth, $http) {
        $rootScope.$state = $state;
        var lastState;
        $rootScope.$on('$stateChangeStart', function (event, to, toParams, fromState, from) {

            if (auth.getUser() === null) {
                auth.pendingStateChange = {
                    to: to,
                    toParams: toParams
                };
            }
            if (to.accessLevel === undefined || auth.authorize(to.accessLevel)) {
                // console.log('access level :', true);
            } else {
                console.log('access level :', false);
                event.preventDefault();
                $state.go('login');

            }
        });
        $rootScope.$on('auth:loginRequire', function () {
            $state.go('login');
        });

        $rootScope.$on('server:error', function () {
            console.log('Server error!!!!');
        });

        $rootScope.$on('page:not found', function () {
            console.log('Page not found!!!!');
        });

        $rootScope.logout = function () {
            auth.logout();
        };

        if ($auth.isAuthenticated()) {

            $http.get('http://localhost:3000/api/me').success(function (data) {
                $rootScope.userData = data;

            }).error(function (err) {
                console.log(err);
            })
        }

        $rootScope.isAuthenticated = function () {
            return $auth.isAuthenticated();
        };
        $rootScope.searchPost = '';

        amMoment.changeLocale('vi'); // setup time local viet nam


        $rootScope.goToPage = function (state, id) { // setup url go to page
            if (!id) {
                $state.go(state);
            } else {
                $state.go(state, id);
            }
        };


        //auth.setHeaderToken();


        $rootScope.slug = function (str) {
            var trans =
            {
                'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
                'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
                'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
                'À': 'a', 'Á': 'a', 'Ả': 'a', 'Ã': 'a', 'Ạ': 'a',
                'Ă': 'a', 'Ằ': 'a', 'Ắ': 'a', 'Ẳ': 'a', 'Ẵ': 'a', 'Ặ': 'a',
                'Â': 'a', 'Ầ': 'a', 'Ấ': 'a', 'Ẩ': 'a', 'Ẫ': 'a', 'Ậ': 'a',
                'đ': 'd', 'Đ': 'd',
                'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
                'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
                'È': 'e', 'É': 'e', 'Ẻ': 'e', 'Ẽ': 'e', 'Ẹ': 'e',
                'Ê': 'e', 'Ề': 'e', 'Ế': 'e', 'Ể': 'e', 'Ễ': 'e', 'Ệ': 'e',
                'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
                'Ì': 'i', 'Í': 'i', 'Ỉ': 'i', 'Ĩ': 'i', 'Ị': 'i',
                'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
                'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
                'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
                'Ò': 'o', 'Ó': 'o', 'Ỏ': 'o', 'Õ': 'o', 'Ọ': 'o',
                'Ô': 'o', 'Ồ': 'o', 'Ố': 'o', 'Ổ': 'o', 'Ỗ': 'o', 'Ộ': 'o',
                'Ơ': 'o', 'Ờ': 'o', 'Ớ': 'o', 'Ở': 'o', 'Ỡ': 'o', 'Ợ': 'o',
                'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
                'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
                'Ù': 'u', 'Ú': 'u', 'Ủ': 'u', 'Ũ': 'u', 'Ụ': 'u',
                'Ư': 'u', 'Ừ': 'u', 'Ứ': 'u', 'Ử': 'u', 'Ữ': 'u', 'Ự': 'u',
                'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
                'Y': 'y', 'Ỳ': 'y', 'Ý': 'y', 'Ỷ': 'y', 'Ỹ': 'y', 'Ỵ': 'y', ' ': '-', '  ': '-',
                '?': ''
            };

            var res = '';

            for (var index = 0; index < str.length; index++) {
                res += (trans[str[index]] || str[index]);
            }

            return res + '.node';
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