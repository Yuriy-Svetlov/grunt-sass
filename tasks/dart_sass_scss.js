/*
 * grunt-sass-scss
 * 
 *
 * Copyright (c) 2021 semiromid
 * Licensed under the MIT license.
 */

'use strict';

const 
  renderSync = require('./functions/renderSync'),
  render = require('./functions/render');

module.exports = function(grunt){

  grunt.registerMultiTask('sass', 'SASS/SCSS to CSS', function(){

    const 
      options = this.options({
        function: 'renderSync',
        sass: {}
      }); 

    if(options.function === 'renderSync'){
      renderSync(grunt, this.files, options);
    }else 
    if(options.function === 'render'){
      render(grunt, this.async(), this.files, options);
    }

  });

}