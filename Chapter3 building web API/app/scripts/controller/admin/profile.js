/**
 * Created by taipham on 10/24/14.
 */
angular.module('myApp')
    .controller('profileCtrl', ['$scope', '$http', 'appConfig', 'ServiceResource', 'getData', 'dataStorage', 'auth', '$log', 'Account', '$alert',
        function ($scope, $http, appConfig, ServiceResource, getData, dataStorage, auth, $log, Account, $alert) {
            $scope.updateUser = function (user) {
                var bttn = document.getElementById('notification-trigger');
                Account.updateProfile({
                    displayName: user.displayName,
                    email: user.email
                }).then(function () {


                    // simulate loading (for demo purposes only)
                    classie.add(bttn, 'active');

                    classie.remove(bttn, 'active');

                    // create the notification
                    var notification = new NotificationFx({
                        wrapper: document.body,
                        message: '<div class="ns-thumb"><img style="width: 63px" src="../images/user1.jpg"/></div><div class="ns-content"><p><a>Cập nhật</a> Thông tin đã được cập nhật</p></div>',
                        layout: 'other',
                        ttl: 3000,
                        effect: 'thumbslider',
                        type: 'notice', // notice, warning, error or success
                        onClose: function () {
                            bttn.disabled = false;
                        }
                    });

                    notification.show();

                });
            }
        }]);