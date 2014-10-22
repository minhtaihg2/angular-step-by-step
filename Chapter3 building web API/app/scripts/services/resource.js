/**
 * Created by taipham.it on 8/19/2014.
 */

angular.module('myApp')
    .factory('ServiceResource', ['$resource', 'appConfig', function ($resource, appConfig) {
        return $resource(appConfig.apiHost + '/:table/:id',
            {
                table: '@table',
                id: '@id'
            }
            , { 'get': {method: 'GET',params: {},isArray: true},
                'save': {method: 'POST', params: {}},
                'query': {method: 'GET', isArray: true},
                'put': {method: 'PUT', params: {}},
                'delete': {method: 'DELETE', params: {}} })
    }]);
