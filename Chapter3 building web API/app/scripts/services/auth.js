/**
 * Created by taipham on 10/12/14.
 */

angular.module('myApp').factory('auth', ['$http', '$log', 'localStorageService',function ($http, $log,localStorageService) {
    var _token = 'token',
        _authorizationKey = 'authorization',
        _setHeaderToken = function (token) {
            $http.defaults.headers.common[_authorizationKey] = token;
        };

    return {
        login: function (user, cb) {
            console.log('auth start...');
            $http({
                method: 'POST',
                data: user,
                url: 'http://127.0.0.1:3000/login'
            }).success(function (data) {
                    _setHeaderToken(data.token);
                    localStorageService.set(_token,data.token);
                    cb(null, data.token);
                }, function (err) {
                    cb(err, null)
                }
            )
        }
    }
}]);