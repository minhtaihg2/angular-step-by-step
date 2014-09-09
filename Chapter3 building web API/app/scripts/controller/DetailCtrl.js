/**
 * Created by taipham.it on 8/18/2014.
 */


'use strict'

angular.module('myApp')
    .controller('DetailCtrl', ['$scope', '$stateParams', 'getData','dataStorage','$location','$state', function ($scope, $stateParams, getData,dataStorage,$location,$state) {
        var _id = $stateParams.id;

        $scope.showEdit = false;
        if (dataStorage.Products.size() > 0) {
            $scope.item =  dataStorage.Products.get(_id);
        }
        else{
            getData.getDataId('Products', _id).then(function (result) {
                console.log('Data :', _id, result);
                $scope.item = result;
            });

        }
       /* var off = $scope.$on('$stateChangeStart', function(evt,  toState, toParams, fromState, fromParams) {
            evt.preventDefault();
            $state.params = toParams;
            angular.copy($state.params, $stateParams);
            off();
        });
        $location.path('chi-tiet/123').replace();*/

        $scope.quickEdit = false;

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
