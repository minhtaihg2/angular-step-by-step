/**
 * Created by taipham.it on 8/18/2014.
 */


'use strict'

angular.module('myApp')
    .controller('DetailCtrl', ['$scope', '$stateParams', 'getData', 'dataStorage', '$location', '$state',
        function ($scope, $stateParams, getData, dataStorage, $location, $state) {
            var _id = $stateParams.id;


            console.log('_id :', _id);

            getData.getDataId('posts', _id).then(function (data) {
                $scope.post = data;
            }, function (err) {
                console.log(err);
            });

            $scope.updateItem = function (item) {

                var bttn = document.getElementById('notification-trigger');
                // simulate loading (for demo purposes only)
                classie.add(bttn, 'active');
                item.update(function (err, result) {
                    if (!err) {
                        classie.remove(bttn, 'active');

                        // create the notification
                        var notification = new NotificationFx({
                            wrapper: document.body,
                            message: '<div class="ns-thumb"><img style="width: 63px" src="../images/user1.jpg"/></div><div class="ns-content"><p><a>Thông báo</a> cập nhật sản phẩm thành công.</p></div>',
                            layout: 'other',
                            ttl: 3000,
                            effect: 'thumbslider',
                            type: 'notice', // notice, warning, error or success
                            onClose: function () {
                                bttn.disabled = false;
                            }
                        });

                        notification.show();
                        console.log('update conplate', true);
                    } else {
                        console.log('err update :', false);
                    }
                })
            };

        }])
