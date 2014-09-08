angular.module("myApp")
    .factory("ServiceHttp", function ($http, $q) {
        var defer = $q.defer();
        return data = {
            getData: function () {
                $http({
                    method: 'GET',
                    url: 'data.json'
                }).success(function (data) {
                    defer.resolve(data);
                }, function (err) {
                    defer.reject(err)
                })
                return defer.promise;
            }
        };
    })
