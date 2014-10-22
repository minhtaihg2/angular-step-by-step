/**
 * Created by taipham.it on 8/19/2014.
 */

'use strict'

angular.module('myApp')
    .factory('getData', ['ServiceResource', 'baseModel', '$q', function (ServiceResource, baseModel, $q) {

        var fetData = {
            getDataTable: function (tableName) {
                var defer = $q.defer();
                ServiceResource.get({table: tableName}, function (data) {
                    var values = data;
                    var dataBaseModel = [];
                    angular.forEach(values, function (item) {
                        var item = new baseModel(tableName, item);
                        dataBaseModel.push(item);
                    })
                    defer.resolve(dataBaseModel);
                }, function (err) {
                    defer.reject(err)
                })
                return defer.promise;
            },
            getDataId: function (tableName, id) {
                var defer = $q.defer();
                ServiceResource.get({table: tableName, id: id}, function (result) {

                    var item = result[0];
                    console.log(item);

                    var data = new baseModel(tableName, item);
                    defer.resolve(data);
                }, function (err) {
                    defer.reject(err);
                })
                return defer.promise;
            }
        }
        return fetData;
    }])
