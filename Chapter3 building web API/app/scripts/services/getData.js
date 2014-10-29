/**
 * Created by taipham.it on 8/19/2014.
 */

'use strict'

angular.module('myApp')
    .factory('getData', ['ServiceResource', 'baseModel', '$q', 'DSCacheFactory',
        function (ServiceResource, baseModel, $q, DSCacheFactory) {
            DSCacheFactory('dataCache', {
                maxAge: 900000, // Items added to this cache expire after 15 minutes.
                cacheFlushInterval: 3600000, // This cache will clear itself every hour.
                deleteOnExpire: 'aggressive' // Items will be deleted from this cache right when they expire.
            });


            var fetData = {
                getDataTable: function (tableName, limit, page, exclude) {
                    var _limit = limit || 1000;
                    var _page;
                    if (page == null) {
                        _page = null;
                    } else {
                        _page = page - 1;
                    }
                    var _exclude = exclude || null;

                    var defer = $q.defer();
                    ServiceResource.get({table: tableName, limit: _limit, number: _page, exclude: _exclude}, function (data) {
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
                    var dataCache = DSCacheFactory.get('dataCache');
                    if (dataCache.get(id)) {
                        defer.resolve(dataCache.get(id));
                        console.log('cache :', dataCache.get(id))
                    } else {
                        ServiceResource.get({table: tableName, id: id}, function (result) {
                            var item = result[0];
                            var data = new baseModel(tableName, item);
                            dataCache.put(id, data);
                            defer.resolve(data);
                        }, function (err) {
                            defer.reject(err);
                        })
                    }
                    return defer.promise;
                }
            };
            return fetData;
        }]);
