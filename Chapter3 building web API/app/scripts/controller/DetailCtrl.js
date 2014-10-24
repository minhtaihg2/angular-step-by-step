/**
 * Created by taipham.it on 8/18/2014.
 */


'use strict'

angular.module('myApp')
    .controller('DetailCtrl', ['$scope', '$stateParams', 'getData', 'dataStorage', '$location', '$state', '$rootScope', 'baseModel',
        function ($scope, $stateParams, getData, dataStorage, $location, $state, $rootScope, baseModel) {
            var _id = $stateParams.id,
                _idUser;

            console.log('_id :', _id);
            if (dataStorage.Posts.size() > 0) {
                $scope.post = dataStorage.Posts.get(_id);
            } else {
                getData.getDataId('posts', _id).then(function (data) {
                    $scope.post = data;
                }, function (err) {
                    console.log(err);
                });
            }

            $scope.userComments = [];
            var cmtForPost = []
            var checkPost = function (data, _id) {
                var length = data.length;
                for (var i = 0; i < length; i++) {

                    if (data[i].post._id == _id) {
                        cmtForPost.push(data[i]);
                    }
                }

                return cmtForPost;
            }

            var loadComments = function () {
                if (dataStorage.Comments.size() > 0) {
                    $scope.userComments = checkPost(dataStorage.Comments.all(), _id);

                } else {
                    getData.getDataTable('comments').then(function (data) {
                        $scope.userComments = checkPost(data, _id);
                        dataStorage.Comments.addAll(data);
                    }, function (err) {
                        // TODO if error
                    });
                }
            };

            $scope.addComment = function (cmt) {
                if (!angular.isUndefined($rootScope.userData)) {
                    _idUser = $rootScope.userData._id;
                } else {
                    $http.get('http://localhost:3000/api/me').success(function (data) {
                        _idUser = data._id;
                    }).error(function (err) {
                        console.log(err);
                    })
                }

                var comment = {
                    Author: _idUser,
                    post: _id,
                    comments: cmt.comments,
                    title: cmt.title
                };
                var item = new baseModel('comments', comment, 'create');
                item.create(function (err, result) {

                    if (err) {
                        //TODO
                        console.log('err save :', err);
                    } else {
                        console.log(result);
                        $scope.userComments.push(result);
                        $scope.cmt = {};
                    }
                })

            };

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
            loadComments();
        }]);
