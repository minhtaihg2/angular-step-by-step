/**
 * Created by taipham.it on 8/18/2014.
 */

'use strict'

angular.module('myApp')
    .controller('MainCtrl', ['$scope', '$http', 'appConfig', 'ServiceResource', 'getData', 'dataStorage', 'auth', function ($scope, $http, appConfig, ServiceResource, getData, dataStorage, auth) {
        var userDemo = {
            username: 'taipham.it',
            password: '123456'
        };

        auth.login(userDemo, function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('data : ', data);
            }
        });

    }])
