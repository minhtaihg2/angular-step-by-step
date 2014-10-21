/**
 * Created by taipham on 9/29/14.
 */

var db = require('../models/db-provider').Users;
var jwt = require('jsonwebtoken');


module.exports = function (app, collection) {

    // crud table

     var dataTable = [
     'users',
     'category',
     'posts',
     'comments'
     ];

     for (var i = 0; i < dataTable.length; i++) {
     app.get('/' + dataTable[i] , collection[dataTable[i]].read);
     app.post('/' + dataTable[i] + '/create', collection[dataTable[i]].create);
     app.get('/' + dataTable[i] + '/:id', collection[dataTable[i]].read);
     app.put('/' + dataTable[i] + '/update/:id', collection[dataTable[i]].update);
     app.delete('/' + dataTable[i] + '/delete/:id', collection[dataTable[i]].deleteId);
     }

  /*  app.get('/:tableName',collection.api);*/




    app.get('/', function (req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });


    app.post('/login', function (req, res) {
        if (req.body.username == '' || req.body.password == '') {
            return res.send(401);
        }

        db.findOne({username: req.body.username}, function (err, user) {
            if (err) {
                console.log(err);
                return res.send(401);
            }

            user.comparePassword(req.body.password, function (isMatch) {
                if (!isMatch) {
                    console.log("Attempt failed to login with " + user.username);
                    return res.send(401);
                }

                var token = jwt.sign(user, 'authentication', { expiresInMinutes: 60 });

                return res.json({token: token});
            });

        });

    });

};

