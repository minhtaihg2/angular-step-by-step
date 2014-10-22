/**
 * Created by taipham on 10/12/14.
 */

angular.module('myApp').factory('auth', ['$http', '$log', 'localStorageService','appConfig',
    function ($http, $log,localStorageService,appConfig) {
    var _token = 'token',
        _role = 'role'
        _authorizationKey = 'authorization',
        _setHeaderToken = function (token) {
            $http.defaults.headers.common[_authorizationKey] = token;
        };

    return {
        login: function (user, cb) {
            $http({
                method: 'POST',
                data: user,
                url: appConfig.apiHost + '/login'
            }).success(function (data) {
                    _setHeaderToken(data.token);
                    localStorageService.set(_token,data.token);
                    localStorageService.set(_role,data.user.role);
                    cb(null, data);
                }, function (err) {
                    cb(err, null)
                }
            )
        }
    }
}]);