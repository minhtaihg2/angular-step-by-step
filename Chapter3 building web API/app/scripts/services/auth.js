/**
 * Created by taipham on 10/12/14.
 */

angular.module('myApp').factory('auth', ['$http', '$log', 'localStorageService', 'appConfig',
    function ($http, $log, localStorageService, appConfig) {
        var _token = 'token',
            _role = 'role',
            _userKey = 'user',
            _authorizationKey = 'authorization',
            _setHeaderToken = function (token) {
                $http.defaults.headers.common[_authorizationKey] = token;
            },
            _clearHeaderToken = function () {
                $http.defaults.headers.common[_authorizationKey] = null;
            };

        return {
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

                var userRole = this.getRole();
                if (null !== userRole) {
                    var result = accessLevel.bitMask <= this.getBitMask;
                    return result;
                } else {
                    return false;
                }
            },
            login: function (user, cb) {
                var me = this;
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
                )
            },
            logout: {
                //TODO clear token,user,role
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