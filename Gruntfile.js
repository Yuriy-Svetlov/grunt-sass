/*
 * grunt-sass-scss
 * 
 *
 * Copyright (c) 2021 semiromid
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['./test/tmp']
    },

    // Configuration to be run (and then tested).
    sass: {
      compile: {
        files: {
          'test/tmp/compile_1.css': 'test/fixtures/1.scss',
          'test/tmp/compile_2.css': 'test/fixtures/2.scss'
        }
      },

      compile_dynamic: {       
        files: [{
          expand: true,
          cwd: 'test/fixtures/',
          src: ['**/*.scss'],
          dest: 'test/tmp',
          ext: '.css'
        }]
      },

      compile_without_map: {
        options: {
          sass: {
            sourceMap: false
          }
        },        
        files: {
          'test/tmp/compile_without_map_1.css': 'test/fixtures/1.scss'
        }
      },
      
      compile_with_map: {
        options: {
          sass: {
            sourceMap: true
          }
        },        
        files: {
          'test/tmp/compile_with_map_1.css': 'test/fixtures/1.scss',
          'test/tmp/compile_with_map_2.css': 'test/fixtures/2.scss'
        }
      },

      compile_async: {   
        options: {
          sass: {
            function: 'render'
          }
        }, 
        files: {         
          'test/tmp/compile_async_1.css': 'test/fixtures/1.scss',
          'test/tmp/compile_async_2.css': 'test/fixtures/2.scss'
        }
      },

      compile_async_without_map: {   
        options: {
          sass: {
            function: 'render',
            sourceMap: false
          }
        }, 
        files: {         
          'test/tmp/compile_async_without_map_1.css': 'test/fixtures/1.scss'
        }
      },

      compile_async_with_map: {   
        options: {
          sass: {
            function: 'render',
            sourceMap: true
          }
        }, 
        files: {         
          'test/tmp/compile_async_with_map_1.css': 'test/fixtures/1.scss',
          'test/tmp/compile_async_with_map_2.css': 'test/fixtures/2.scss'
        }
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'sass', 'nodeunit']);

};
