module.exports = function (grunt) {
    // Load in all our tasks.
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // SASS
        // Convert our sass to css
        sass: {
            dist: {
                options: {
                    // Output in readable format.
                    style: 'expanded'
                },

                // Compile all .scss files in our sass folder to our css folder.
                files: [{
                    expand: true,
                    cwd: 'sass',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        // AUTOPREFIXER
        // Automatically add the vendor prefixes we want for css3
        autoprefixer: {
            options: {
                // Specify what kind of support we want.
                // Note: Blackberry and Android not covered by 'last n verison', add manually if desired.
                browsers: [
                    'last 2 version',
                    'ie 9',
                    'ie 8'
                ],

                // Align prefixes at end of property name instead of start, e.g.:
                // -webkit-box-shadow: 0 0 0 #000;
                //         box-shadow: 0 0 0 #000;
                cascade: true,

                // Don't make a sourcemap.
                map: false
            },

            // List the css files sass generated so we just write over them.
            no_dest: {
                src: 'css/style.css'
            }
        },

        // WATCH
        // Monitor specific files and excute corresponding tasks when they change.
        watch: {
            // General files.
            /*html: {
                files: '*.html'
            },*/

            // Update styles.
            sass: {
                files: 'sass/*.scss',
                tasks: ['sass', 'autoprefixer']
            },

            // Update javascript.
            scripts: {
                files: 'js/*.js',
                // tasks: ['jshint']
            },

            // Use livereload for automatic page updates.
            // We have to add a script tag to our page or use the broswer extension for this work.
// TODO: Investigate alternate option of injecting tag with connect-load middleware.
            livereload: {
                options: { livereload: true },
                // Files we want lr to repsond to. 
                files: [
                    '*.html',
                    '*.aspx',
                    'css/*.css',
                    'js/*.js',
                    'img/*'
                ]
            }       
        },

        // JSHINT
        // Check our javascript for errors.
        jshint: {
            // List the files we want to check.
            files: {
                src: ['js/main.js']
            },

            // Linting options. http://www.jshint.com/docs/options/
            options: {
                'curly': true,
                'eqnull': true,
                'eqeqeq': true,
                'undef': true,
                'globals': {
                    'jQuery': true,
                    'console': true
                }
            },

            // If you want to use a .jshintrc file instead of options param, uncommnent this.
            // jshintrc: true
        }
    });

    // On watch events only run on changed file.
    grunt.event.on('watch', function(action, filepath) {
          grunt.config('sass', filepath);
    });

    // Execute by just running `grunt`
    grunt.registerTask('default', ['sass', 'autoprefixer']);
    // `grunt dev` starts watch task/livereload for better development process.
    grunt.registerTask('dev', ['watch']);
};