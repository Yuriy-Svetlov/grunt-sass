/*
 * grunt-sass-scss
 *
 * Copyright (c) 2021 semiromid
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt, options, file, result){
  if(options.sourceMap && result.map){
    grunt.file.write(
      (options.sourceMap === true) ? file.dest + '.map' : options.sourceMap, 
      result.map
    );
  }
}
