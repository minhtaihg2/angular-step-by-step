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
            console.log('to.accessLevel :', to.accessLevel);
            if (to.accessLevel === undefined || auth.authorize(to.accessLevel)) {
                //TODO action
            } else {
                event.preventDefault();
                $state.go('login');
            }

            if(auth.getToken() == null){
                //TODO action has method token
            }else{
                $rootScope.userLogin.isLogin = true;
                $rootScope.userLogin.user = auth.getUser();
            }
        });
        $rootScope.$on('unauthorize', function () {
            //TODO authorize
        });

        $rootScope.logout = function () {
            auth.logout();
            $rootScope.userLogin.isLogin = false;
            $state.go('index.home');
        };

        amMoment.changeLocale('vi'); // setup time local viet nam
        $rootScope.$state = $state;

        $rootScope.goToPage = function (state, id) { // setup url go to page
            if (!id) {
                $state.go(state);
            } else {
                $state.go(state, id);
            }
        };
        $rootScope.userLogin = function () {
            return{
                isLogin: auth.isLogin(),
                user: null
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