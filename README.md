Angular-step-by-step
====================

Learning AngularJS step by step

#### Chapter 1 basic AngularJS with:

* Controller
* Core API angularJS
* Module DI

#### Chapter 2
* Directive
* $http
* Promise
* Filter
* Validate

#### Chapter 3

Building website with grunt,bower using RESTful API

=====================

npm install

bower update

grunt `Opening server for ... on port 9001.`


#### With server node : 



* npm install

* npm start

you can login get token POSTMAN : localhost:3000/login

Schema for POSTMAN: 
+ users : username,password
+ category : Category,Description
+ posts : title,content,slug,commentName,desc,Author(ObjectId - > _id from users),Category(ObjectId -> _id from category)
+ comments : post(ObjectId - > _id from posts),comments,
+ userSchema2 : // login social

(similar : posts,comments,category)

Browser : http://localhost:3000/userSchema2 -> show user (user local + user social)

==========================

user Admin login :

username : admin@gmail.com
password : admin



## tks!!!

