/**
 * Created by taipham.it on 8/19/2014.
 */

angular.module('myApp')
    .factory('baseModel', ['ServiceResource', function (ServiceResource) {
        var baseModel = function (tableName, data) {
            this.omitFiled = ['omitFiled', 'busy', 'tableName'];
            this.tableName = tableName;
            this.busy = false;

            var me = this;
            angular.extend(me, data)
        };

        baseModel.prototype.create = function (callback) {
            var me = this;
            if (me.busy) {
                return
            }
            var saveData = window._.omit(me, me.omitFiled);
            me.busy = true;
            ServiceResource.save({table: me.tableName}, saveData, function (result) {
                if (result.success) {
                    me.busy = false;
                    console.log('save :', result);
                }
                if (callback) {
                    callback(result.success ? null : result.message, result.data)
                }
            })

        };

        baseModel.prototype.update = function (callback) {

            var me = this;
            if (me.busy) {
                return;
            }

            var updateData = window._.omit(me, me.omitFiled);

            me.busy = true;
            ServiceResource.put({table: me.tableName,id : me.id}, updateData, function (result) {
                console.log('result update :',result);
                me.busy = false;
                if (callback) {
                    callback(result.success ? null : result.message, result.data)
                }
            })
        };

        baseModel.prototype.delete = function (callback) {
            var me = this;
            if (me.busy) {
                return;
            }

            me.busy = true;
            ServiceResource.delete({table: me.tableName, id: me._id}, function (result) {
                console.log('delete data :', true);
                me.busy = false;
                if (callback) {
                    callback(result.success ? null : result.message, result.data)
                }
            })
        }

        return baseModel;
    }])
