/**
 * Created by taipham on 9/29/14.
 */

var collection = {};
var User = require('./db-provider').Users;
var Post = require('./db-provider').Posts;
var Category = require('./db-provider').Categories;
var Comment = require('./db-provider').Comments;

collection.users = require('./crud')(User);
collection.posts = require('./crud')(Post);
collection.category = require('./crud')(Category);
collection.comments = require('./crud')(Comment);

module.exports = collection;
