/**
 * Created by taipham.it on 8/18/2014.
 */

'use strict'

angular.module('myApp')
    .controller('MainCtrl', ['$scope', '$http', 'appConfig', 'ServiceResource', 'getData', 'dataStorage', function ($scope, $http, appConfig, ServiceResource, getData, dataStorage) {
        if (dataStorage.Products.size() > 0) {
            $scope.listProducts = dataStorage.Products.all();
        } else {
            getData.getDataTable('Products').then(function (result) {
                $scope.listProducts = result;
                dataStorage.Products.addAll(result)
            })
        }
        $scope.offAds = true;

    }])
