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

module.exports = function(grunt, done, files, options){

  (async function(){

    // Adding promises 
    const promises = files.map(async function(file){
      const [src] = file.src;

      if(src === undefined || path.basename(src).charAt(0) === '_'){
        return;
      }

      options.sass.file = src;
      options.sass.outFile = file.dest;

      const result = await sassRender(options.sass);

      grunt.file.write(file.dest, result.css);

      writeSourceMap(grunt, options.sass, file, result);
    });

    await Promise.all(promises);

  })()
  .then(function(){
    done();
  })
  .catch(function(error){
    if(options.onError !== undefined && typeof options.onError === 'function'){
      options.onError(error);
    }

    grunt.fatal(error.formatted || error);     
  });

}


function sassRender(options){
  return new Promise(function(resolve, reject){
    sass.render(options, function(error, result){
      if(!error){
        return resolve(result); 
      }

      return reject(error);     
    });
  })
}