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

    config.soical = {
        TOKEN_SECRET: process.env.TOKEN_SECRET || 'A hard to guess string',
        FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || '2ad286aa6ded0cbaa10fdc65b05bce7d',
        FOURSQUARE_SECRET: process.env.FOURSQUARE_SECRET || 'Foursquare Client Secret',
        GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'EkTY60tlCL0v5ka7tDdl587A',
        GITHUB_SECRET: process.env.GITHUB_SECRET || 'GitHub Client Secret',
        LINKEDIN_SECRET: process.env.LINKEDIN_SECRET || 'LinkedIn Client Secret',
        TWITTER_KEY: process.env.TWITTER_KEY || 'Twitter Consumer Key',
        TWITTER_SECRET: process.env.TWITTER_SECRET || 'Twitter Consumer Secret',
        TWITTER_CALLBACK: process.env.TWITTER_CALLBACK || 'Twitter Callback Url'
    }


})(module.exports);