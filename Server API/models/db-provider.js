/**
 * Created by taipham on 9/28/14.
 */


(function (dbProvider) {
    var db = require('../config/config');
    var bcrypt = require('bcrypt-nodejs');
    var bcrypt1 = require('bcryptjs');
    var userSchema,
        categorySchema,
        commentSchema,
        postSchema,
        userSchema2,
        SALT_WORK_FACTOR = 10;




    var userSchema2 = new db.Schema({
        email: { type: String, unique: true, lowercase: true },
        role : {
            type: 'String',
            default : 'user'
        },
        password: { type: String, select: false },
        displayName: String,
        facebook: String,
        foursquare: String,
        google: String,
        github: String,
        linkedin: String,
        twitter: String
    });

    userSchema2.pre('save', function(next) {
        var user = this;
        if (!user.isModified('password')) {
            return next();
        }
        bcrypt1.genSalt(10, function(err, salt) {
            bcrypt1.hash(user.password, salt, function(err, hash) {
                user.password = hash;
                next();
            });
        });
    });

    userSchema2.methods.comparePassword = function(password, done) {
        bcrypt1.compare(password, this.password, function(err, isMatch) {
            done(err, isMatch);
        });
    };

/*
* ============================ DB BASE ============
* */



    userSchema = new db.Schema({
        username: {
            type: 'String',
            required: true
        },
        password: 'String',
        role: {
            type: 'String',
            default: 'user'
        }

    }, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

    // authentication password


    // Bcrypt middleware on UserSchema

    userSchema.pre('save', function (next) {
        var user = this;

        if (!user.isModified('password')) return next();

        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    });

//Password verification
    userSchema.methods.comparePassword = function (password, cb) {
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err) return cb(err);
            cb(isMatch);
        });
    };


    // hash and slat

    userSchema.methods.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    userSchema.methods.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    postSchema = new db.Schema({
        title: {
            type: 'String',
            required: true
        },
        desc: {
            type: 'String'
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
        },
        views: {
            type: 'Number',
            default: 0
        },
        totalComment : {
            type: 'Number',
            default: 0
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
            ["Author", "username"],
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
        comments: 'String',
        commentName: 'String',
        CreateAt: {
            type: Date,
            default: Date.now
        }
    });

    commentSchema.statics.getPopulation = function () {
        return [
            ["post" , "title content slug"]
        ];
    };

// create model collection

    var Users = db.mongoose.model('Users', userSchema);
    var Categories = db.mongoose.model('Categories', categorySchema);
    var Posts = db.mongoose.model('Posts', postSchema);
    var Comments = db.mongoose.model('Comments', commentSchema);
    var userSchema2 = db.mongoose.model('userSchema2', userSchema2);

    dbProvider.Users = Users;
    dbProvider.Categories = Categories;
    dbProvider.Posts = Posts;
    dbProvider.Comments = Comments;
    dbProvider.userSchema2 = userSchema2;


    /* dbProvider.Posts.find({}).populate('Category', {}).populate('Author', {}).exec();*/

})(module.exports);