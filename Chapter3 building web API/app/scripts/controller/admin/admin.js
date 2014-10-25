/**
 * Created by taipham on 10/23/14.
 */

angular.module('myApp')
    .controller('adminCtrl', ['$scope', '$http', 'appConfig', 'ServiceResource', 'getData', 'dataStorage', 'auth', '$log', 'baseModel', '$rootScope',
        function ($scope, $http, appConfig, ServiceResource, getData, dataStorage, auth, $log, baseModel, $rootScope) {
            console.log('create Posts');

            var _idUser;

            getData.getDataTable('category').then(function (data) {
                    $scope.categories = data;
                    $scope.post =
                    {
                        Category: data[0]._id
                    }
                }, function (err) {
                    // TODO if error
                }
            );


            $scope.addPost = function (cmt) {
                if (!angular.isUndefined($rootScope.userData)) {
                    _idUser = $rootScope.userData._id;
                } else {
                    $http.get('http://localhost:3000/api/me').success(function (data) {
                        _idUser = data._id;
                    }).error(function (err) {
                        console.log(err);
                    })
                }
                var bttn = document.getElementById('notification-trigger');
                classie.add(bttn, 'active');

                var post = {
                    Author: _idUser,
                    Category: cmt.Category,
                    desc: cmt.desc,
                    content: cmt.content,
                    title: cmt.title
                };

                var item = new baseModel('Posts', post, 'create');
                item.create(function (err, result) {

                    if (err) {
                        //TODO
                        console.log('err save :', err);
                    } else {

                        classie.remove(bttn, 'active');

                        // create the notification
                        var notification = new NotificationFx({
                            wrapper: document.body,
                            message: '<div class="ns-thumb"><img style="width: 63px" src="../images/user1.jpg"/></div><div class="ns-content"><p><a>Thông báo :</a> Cảm ơn ơn,bài viết của bạn đang được duyệt</p></div>',
                            layout: 'other',
                            ttl: 5000,
                            effect: 'thumbslider',
                            type: 'notice', // notice, warning, error or success
                            onClose: function () {
                                bttn.disabled = false;
                            }
                        });

                        notification.show();

                        dataStorage.Posts.add(result);
                        $scope.cmt = {};
                    }
                })


            };

        }])
;