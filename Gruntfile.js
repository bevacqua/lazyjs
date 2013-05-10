'use strict';

module.exports = function(grunt) {
    var opts = {
        clean: [
            './build'
        ],
        jshint: {
            browser: {
                files: {
                    src: ['src/**/*.js', '!src/vendor/**/*.js']
                },
                options: {
                    jshintrc: '.jshintrc'
                }
            },
            node: {
                files: {
                    src: ['Gruntfile.js', 'test/**/*.js']
                },
                options: {
                    jshintrc: '.jshintrc-node'
                }
            }
        },
        jasmine_node: {
            matchall: true,
            forceExit: true,
            projectRoot: './test/spec'
        },
        assetify: {
            options: {
                production: true,
                assets: require('./assets.js'),
                plugins: {
                    bundle: true
                }
            }
        }
    };

    grunt.initConfig(opts);

    grunt.loadNpmTasks('grunt-assetify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jasmine-node');

    grunt.registerTask('test', ['clean', 'jshint', 'jasmine_node']); // cleanup and run tests

    grunt.registerTask('build', ['assetify:bla']); // compile assets

    grunt.registerTask('default', ['test', 'build']); // by default, run the tests and build

    grunt.registerTask('demo', 'A task to run the demo server', function(){
        var done = this.async(),
            http = require('http'),
            sta = require('node-static'),
            staServer = new sta.Server();

        http.createServer(function(req, res){
            staServer.serve(req, res, function (err, result) {
                if (err) {
                    console.error("> Error serving " + req.url + " - " + err.message);
                    res.writeHead(err.status, err.headers);
                    res.end();
                } else {
                    console.log("> " + req.url + " - " + result.message);
                }
            });
        }).listen(5050, function(){
            console.log('Navigate to localhost:5050/demo/development.html or localhost:5050/demo.production.html');
        }).on('close', done);
    });
};