module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            src: {
                expand: true,
                cwd: "src/js",
                src: ["**/*.js"],
                dest: "public/js",
                ext: ".min.js"
            }
        },

        less: {
            options: {
                paths: ["src/less"]
            },
            src: {
                expand: true,
                cwd: "src/less",
                src: ["**/*.less"],
                dest: "src/css",
                ext: ".css"
            }
        },

        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            src: {
                expand: true,
                cwd: "src/css",
                src: ["**/*.css"],
                dest: "public/css",
                ext: ".min.css"
            }
        },

        watch: {
            stylesheets: {
                files: ['src/**/*.css', 'src/**/*.less'],
                tasks: ['less', 'cssmin']
            },
            scripts: {
                files: 'src/**/*.js',
                tasks: ['uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'uglify', 'cssmin']);

};
