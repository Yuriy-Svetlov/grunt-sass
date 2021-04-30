/*
 * grunt-sass-scss
 * 
 * Copyright (c) 2021 semiromid
 * Licensed under the MIT license.
 */

'use strict';

const 
  sass = require('sass'),
  writeSourceMap = require('./write_source_map'),
  path = require('path');

module.exports = function(grunt, files, options){
  
  files.forEach(function(file){
  
    const 
      [src] = file.src;

    if(src === undefined){
      return;
    }

    if(!grunt.file.exists(src)){
       console.warn(`Source file \x1b[33m%s\x1b[0m not found.`, src);
       return;
    }

    if(path.basename(src).charAt(0) === '_'){
      return;
    }
    
    options.sass.file = src;
    options.sass.outFile = file.dest;

    try{
      const 
        result = sass.renderSync(options.sass);

      grunt.file.write(file.dest, result.css);

      writeSourceMap(grunt, options.sass, file, result);

    }catch(error){
      if(options.onError !== undefined && typeof options.onError === 'function'){
        options.onError(error);
      }

      grunt.fatal(error.formatted || error);
    } 

  }); 

}