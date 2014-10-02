/**
 * Created by taipham on 9/29/14.
 */


module.exports = function (app, passport, collection) {

    // crud table
    var dataTable = [
        'users',
        'category',
        'posts',
        'comments'
    ];

    for (var i = 0; i < dataTable.length; i++) {
        app.get('/' + dataTable[i], isLoggedIn, collection[dataTable[i]].read);
        app.post('/' + dataTable[i] + '/create', isLoggedIn, collection[dataTable[i]].create);
        app.get('/' + dataTable[i] + '/:id', isLoggedIn, collection[dataTable[i]].read);
        app.put('/' + dataTable[i] + '/update/:id', isLoggedIn, collection[dataTable[i]].update);
        app.delete('/' + dataTable[i] + '/delete/:id', isLoggedIn, collection[dataTable[i]].deleteId);
    }

    app.get('/', function (req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/posts', // redirect to the secure posts section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/posts', // redirect to the secure post section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
