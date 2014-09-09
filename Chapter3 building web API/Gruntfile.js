/**
 * Created by taipham.it on 8/18/2014.
 */

// Gruntfile.js
// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            serve: {
                port: 9001,
                base: 'app',
                target: 'localhost:9001'
            }
        }
    })

    grunt.loadNpmTasks('grunt-connect');
    grunt.registerTask('default', 'connect:serve');

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these

};
