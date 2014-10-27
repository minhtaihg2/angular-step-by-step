/**
 * Created by taipham.it on 8/18/2014.
 */


'use strict'

angular.module('myApp')
    .controller('DetailCtrl', ['$scope', '$stateParams', 'getData', 'dataStorage', '$location', '$state', '$rootScope', 'baseModel', '$http',
        function ($scope, $stateParams, getData, dataStorage, $location, $state, $rootScope, baseModel, $http) {
            var _id = $stateParams.id,
                _idUser;
            var addView = function (data, flag) {

                var item = {};
                if (flag == 0) {
                    item.views = data.views + 1;
                } else {
                    item.totalComment = data.totalComment + 1;
                }


                $http({url: 'http://localhost:3000/posts/update/' + data._id, method: 'PUT', data: item}).success(function (resp) {
                    if (flag == 0) {
                        data.views = data.views + 1;
                    } else {
                        data.totalComment = data.totalComment + 1;
                    }
                    dataStorage.Posts.update(data);
                }, function (err) {
                    console.log(err);
                })

            };
            console.log('_id :', _id);


            if (dataStorage.Posts.size() > 0) {
                $scope.post = dataStorage.Posts.get(_id);
                addView($scope.post, 0);
            } else {
                getData.getDataId('posts', _id).then(function (data) {
                    $scope.post = data;
                    addView($scope.post, 0);
                }, function (err) {
                    console.log(err);
                });
            }

            $scope.userComments = [];
            var cmtForPost = [];
            var checkPost = function (data, _id) {
                var length = data.length;
                for (var i = 0; i < length; i++) {

                    if (data[i].post._id == _id) {
                        cmtForPost.push(data[i]);
                    }
                }

                return cmtForPost;
            };

            var loadComments = function () {


                if (dataStorage.Comments.size() > 0) {
                    $scope.userComments = checkPost(dataStorage.Comments.all(), _id);

                } else {
                    getData.getDataTable('comments').then(function (result) {
                        dataStorage.Comments.addAll(result);
                        $scope.userComments = checkPost(result, _id);

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
                var bttn = document.getElementById('notification-trigger');
                classie.add(bttn, 'active');
                var comment = {
                    Author: _idUser,
                    post: _id,
                    comments: cmt.comments,
                    title: cmt.title
                };
                var item = new baseModel('comments', comment);
                item.create(function (err, result) {

                    if (err) {
                        //TODO
                        console.log('err save :', err);
                    } else {
                        addView(dataStorage.Posts.get(_id), 1);
                        classie.remove(bttn, 'active');

                        // create the notification
                        var notification = new NotificationFx({
                            wrapper: document.body,
                            message: '<div class="nfs-thumb"><img style="width: 63px" src="../images/user1.jpg"/></div><div class="ns-content"><p><a>Thông báo :</a> cảm ơn bạn đã bình luận bài viết này</p></div>',
                            layout: 'other',
                            ttl: 5000,
                            effect: 'thumbslider',
                            type: 'notice', // notice, warning, error or success
                            onClose: function () {
                                bttn.disabled = false;
                            }
                        });

                        notification.show();
                        $scope.userComments.push(result);
                        //dataStorage.Comments.add(result);
                        $scope.cmt = {};
                    }
                })

            };
            loadComments();
        }]);
