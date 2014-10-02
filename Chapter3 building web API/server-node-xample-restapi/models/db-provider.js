/**
 * Created by taipham on 9/28/14.
 */


(function (dbProvider) {
    var db = require('../config/config');
    var bcrypt = require('bcrypt-nodejs');
    var userSchema,
        categorySchema,
        commentSchema,
        postSchema;

    userSchema = new db.Schema({
        username: {
            type: 'String',
            required: true
        },
        password: 'String'

    }, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

    // hash and slat

    userSchema.methods.generateHash = function(password){
        return bcrypt.hashSync(password , bcrypt.genSaltSync(8),null);
    };

    userSchema.methods.validPassword = function(password){
        return bcrypt.compareSync(password, this.password);
    };

    postSchema = new db.Schema({
        title: {
            type: 'String',
            required: true
        },
        content: 'String',
        slug: 'String',
        Author: {
            ref: 'Users',
            type: db.ObjectId
        },
        Category: {
            ref: 'Categories',
            type: db.ObjectId
        },
        CreateAt: {
            type: Date,
            default: Date.now
        }
    }, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

    postSchema.statics.getPopulation = function () {
        return [
            ["Author", "username password"],
            ["Category", "*"]
        ];
    };

    categorySchema = new db.Schema({
        Category: {
            type: 'String',
            required: true
        },
        Description: 'String'

    }, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

    commentSchema = new db.Schema({
        post: {
            type: db.ObjectId,
            ref: 'Posts'
        },
        comments: 'String'
    });

    commentSchema.statics.getPopulation = function () {
        return [
            ["post" ,"title content slug"]
        ];
    };

// create model collection

    var Users = db.mongoose.model('Users', userSchema);
    var Categories = db.mongoose.model('Categories', categorySchema);
    var Posts = db.mongoose.model('Posts', postSchema);
    var Comments = db.mongoose.model('Comments', commentSchema);

    dbProvider.Users = Users;
    dbProvider.Categories = Categories;
    dbProvider.Posts = Posts;
    dbProvider.Comments = Comments;


    /* dbProvider.Posts.find({}).populate('Category', {}).populate('Author', {}).exec();*/

})(module.exports);