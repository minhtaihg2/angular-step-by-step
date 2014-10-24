/**
 * Created by taipham on 10/24/14.
 */
angular.module('myApp')
    .controller('profileCtrl', ['$scope', '$http', 'appConfig', 'ServiceResource', 'getData', 'dataStorage', 'auth', '$log','Account','$alert',
        function ($scope, $http, appConfig, ServiceResource, getData, dataStorage, auth, $log,Account,$alert) {

                Account.getProfile()
                    .success(function(data) {
                        $scope.user = data;

                    })
                    .error(function(error) {
                       /* $alert({
                            content: error.message,
                            animation: 'fadeZoomFadeDown',
                            type: 'material',
                            duration: 3
                        });*/

                        console.log(error);
                    });

        }]);