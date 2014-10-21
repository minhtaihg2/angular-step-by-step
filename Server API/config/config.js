/**
 * Created by taipham on 9/28/14.
 */

(function (config) {
    var mongoose = require('mongoose'),
        urlConnect;

    // setup mongoose connect with mongolab.com here:

    var mongooseLab = {
        user: 'demo',
        pass: 'demo',
        address: '@ds035270.mongolab.com:35270/nodejs'
    };

    // setup mongoose connect localhost here

    var mongooseLocal = 'localhost:27017/test';

    if (mongooseLab.user == '') {
        console.log('Connect to mongolab');
        urlConnect = mongooseLocal;
    } else {
        urlConnect = 'mongodb://' + mongooseLab.user + ':' + mongooseLab.pass + mongooseLab.address;
    }

    config.mongoose = mongoose;
    config.Schema = mongoose.Schema;
    config.ObjectId = mongoose.Schema.Types.ObjectId;

    var connectMongoose = function () {
        mongoose.connect(urlConnect);
        console.log('connect mongoose....');
    };

    connectMongoose();


})(module.exports);