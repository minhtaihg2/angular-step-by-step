/**
 * Created by taipham on 10/24/14.
 */


angular.module('myApp')
    .factory('Account', function($http, $auth) {
        return {
            getProfile: function() {
                return $http.get('http://localhost:3000/api/me');
            },
            updateProfile: function(profileData) {
                return $http.put('http://localhost:3000/api/me', profileData);
            }
        };
    });