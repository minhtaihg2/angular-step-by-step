/**
 * Created by TaiPham.IT on 9/8/2014.
 */

var ServiceArray = function () {
    this.dataArray = [];
    this.MAX_LENGTH = 5;
};

ServiceArray.prototype.push = function (data) {
    var newLength;
    newLength = this.dataArray.unshift(data);
    if (newLength > this.MAX_LENGTH) {
        console.log('Err length Max 5 item');
    }
};

ServiceArray.prototype.remove = function (index) {
    this.dataArray.splice(index,1);
};


ServiceArray.prototype.getValues = function () {
    return this.dataArray;
};
