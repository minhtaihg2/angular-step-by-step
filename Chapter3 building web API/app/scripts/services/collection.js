/**
 * Created by taipham.it on 8/19/2014.
 */

'use strict'

angular.module('myApp')
    .service('dataStorage', ['$collection', function ($collection) {
        return {
            Posts: $collection.getInstance(),
            Categories: $collection.getInstance(),
            Comments: $collection.getInstance()
        };
    }]);
