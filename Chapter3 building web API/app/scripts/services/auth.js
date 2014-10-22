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
                        cb(null, data);
                    }, function (err) {
                        cb(err, null)
                    }
                )
            },
            getUser: function () {
                return localStorageService.get(_userKey);
            },
            setUser: function (user) {
                localStorageService.set(_userKey, user);
            },
            getRole: function () {
                return localStorageService.get(_role);
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