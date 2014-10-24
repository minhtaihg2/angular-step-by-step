/**
 * Created by taipham on 10/12/14.
 */

angular.module('myApp').factory('auth', ['$http', '$log', 'localStorageService', 'appConfig', '$auth', '$window',
    function ($http, $log, localStorageService, appConfig, $auth, $window) {
        var _token = 'token',
            _role = 'role',
            _userKey = 'user',
            _authorizationKey = 'authorization',
            _satellizer_token = 'satellizer_token',
            _setHeaderToken = function (token) {
                $http.defaults.headers.common[_authorizationKey] = token;
            },
            _clearHeaderToken = function () {
                $http.defaults.headers.common[_authorizationKey] = null;
            };

        return {
            setHeaderToken: function () {
                var token = this.getToken();

                if (token) {
                    _setHeaderToken(token);
                } else {
                    _setHeaderToken(null);
                }
            },
            getHeaderToken: function () {
                var token = $http.defaults.headers.common[_authorizationKey];
                if (token) {
                    return token;
                } else {
                    return null;
                }
            },
            pendingStateChange: null,
            resolvePendingState: function (httpPromise) {

                var checkUser = $q.defer();
                var me = this;
                var pendingState = me.pendingStateChange;

                httpPromise
                    .success(function (data) {
                        if (data.success) {
                            me.setUser(data.user);

                            if (pendingState.to.accessLevel === undefined || me.authorize(pendingState.to.accessLevel)) {
                                checkUser.resolve();
                            } else {

                                checkUser.reject('unauthorized'); // may be 403
                            }
                        } else {
                            checkUser.reject('401');
                        }
                    })
                    .error(function (err, status, headers, config) {
                        checkUser.reject(status.toString());
                    });

                me.pendingStateChange = null;
                return checkUser.promise;
            },
            authorize: function (accessLevel) {
                var tokenUser = $window.localStorage[_satellizer_token] ? $window.localStorage[_satellizer_token] : null;

                if (null !== tokenUser) {
                    var result = accessLevel.bitMask <= this.getBitMask;

                    return result;
                } else {
                    return false;
                }
            },
            login: function (user, cb) {
                var me = this;
                /*
                 $http({
                 method: 'POST',
                 data: user,
                 url: appConfig.apiHost + '/login'
                 }).success(function (data) {
                 _setHeaderToken(data.token);
                 me.setToken(data.token);
                 me.setRole(data.user.role);
                 me.setUser(data.user);
                 me.getBitMask = data.bitMask;
                 cb(null, data);
                 }, function (err) {
                 cb(err, null)
                 }
                 )*/


                $auth.login({
                    email: user.email,
                    password: user.password
                }).then(function (response) {
                    cb(null, response);
                    me.getBitMask = response.data.bitMask;
                });
            },
            authenticate: function (provider, cb) {
                var me = this;
                $auth.authenticate(provider).then(function (response) {
                    cb(null, response);
                    me.getBitMask = 1;
                });
            },
            logout: function () {
                _clearHeaderToken();
                localStorageService.set(_userKey, null);
                localStorageService.set(_role, null);
                localStorageService.set(_token, null);
            },
            getBitMask: 0,
            getUser: function () {
                return localStorageService.get(_userKey);
            },
            setUser: function (user) {
                localStorageService.set(_userKey, user);
            },
            getRole: function () {
                if (!!localStorageService.get(_role)) {
                    return localStorageService.get(_role);
                }
                return null;
            },
            setRole: function (role) {
                localStorageService.set(_role, role);
            },
            getToken: function () {
                return  localStorageService.get(_token);
            },
            setToken: function (token) {
                localStorageService.set(_token, token);
            },
            clearToken: function () {
                _clearHeaderToken();
                localStorageService.set(_token, null);

            },
            isLogin: function () {
                var role = this.getRole();
                return (role) ? true : false;
            }
        }
    }]);