'use strict';

var grunt = require('grunt');

const 
  path_tmp = 'test/tmp/',
  path_expected = 'test/expected/';


exports.sass = {

  compile(test) {
    test.expect(2);

    const 
      filename_1 = 'compile_1.css',
      filename_2 = 'compile_2.css',

      actual_1 = read_file_tmp(filename_1),
      expected_1 = read_file_expected(filename_1),

      actual_2 = read_file_tmp(filename_2),
      expected_2 = read_file_expected(filename_2);

    test.equal(actual_1, expected_1, 'should compile Sass to Css - file 1');
    test.equal(actual_2, expected_2, 'should compile Sass to Css - file 2');

    test.done();
  },

  compile_dynamic(test) {
    test.expect(2);

    const 
      filename_1 = '1.css',
      filename_2 = '2.css',

      actual_1 = read_file_tmp(filename_1),
      expected_1 = read_file_expected(filename_1),

      actual_2 = read_file_tmp(filename_2),
      expected_2 = read_file_expected(filename_2);

    test.equal(actual_1, expected_1, 'should compile Sass to Css - file 1');
    test.equal(actual_2, expected_2, 'should compile Sass to Css - file 2');

    test.done();
  },

  compile_without_map(test) {
    test.expect(2);

    let 
      filename_1 = 'compile_without_map_1.css',
      actual_1 = read_file_tmp(filename_1),
      expected_1 = read_file_expected(filename_1);

    // .css
    test.equal(actual_1, expected_1, 'should compile Sass to Css - file 1');

    // .css.map
    actual_1 = file_exists(get_path_tmp(filename_1 +'.map'));
    test.equal(actual_1, false, 'css map should not exist - file 2');

    test.done();
  },

  compile_with_map(test) {
    test.expect(4);

    const       
      filename_1 = 'compile_with_map_1.css',
      filename_2 = 'compile_with_map_2.css';

    // .css
    let 
      actual_1 = read_file_tmp(filename_1),
      expected_1 = read_file_expected(filename_1),

      actual_2 = read_file_tmp(filename_2),
      expected_2 = read_file_expected(filename_2);

    test.equal(actual_1, expected_1, 'should compile Sass to Css - file 1');
    test.equal(actual_2, expected_2, 'should compile Sass to Css - file 2');

    // .css.map
    actual_1 = file_exists(get_path_tmp(filename_1 +'.map'));
    expected_1 = true;

    actual_2 = file_exists(get_path_tmp(filename_2 +'.map'));
    expected_2 = true;

    test.equal(actual_1, expected_1, 'css map must exist - file 1');
    test.equal(actual_2, expected_2, 'css map must exist - file 2');

    test.done();
  },

  compile_async(test) {
    test.expect(2);

    const 
      filename_1 = 'compile_async_1.css',
      filename_2 = 'compile_async_2.css',

      actual_1 = read_file_tmp(filename_1),
      expected_1 = read_file_expected(filename_1),

      actual_2 = read_file_tmp(filename_2),
      expected_2 = read_file_expected(filename_2);

    test.equal(actual_1, expected_1, 'should compile Sass to Css - file 1');
    test.equal(actual_2, expected_2, 'should compile Sass to Css - file 2');

    test.done();
  },

  compile_async_without_map(test) {
    test.expect(2);

    let 
      filename_1 = 'compile_async_without_map_1.css',

      actual_1 = read_file_tmp(filename_1),
      expected_1 = read_file_expected(filename_1);

    // .css
    test.equal(actual_1, expected_1, 'should compile Sass to Css - file 1');

    // .css.map
    actual_1 = grunt.file.exists(get_path_tmp(filename_1 +'.map'));
    test.equal(actual_1, false, 'css map should not exist - file 1');

    test.done();
  },
  
  compile_async_with_map(test) {
    test.expect(4);

    const       
      filename_1 = 'compile_async_with_map_1.css',
      filename_2 = 'compile_async_with_map_2.css';

    // .css
    let 
      actual_1 = read_file_tmp(filename_1),
      expected_1 = read_file_expected(filename_1),

      actual_2 = read_file_tmp(filename_2),
      expected_2 = read_file_expected(filename_2);

    test.equal(actual_1, expected_1, 'should compile Sass to Css - file 1');
    test.equal(actual_2, expected_2, 'should compile Sass to Css - file 2');

    // .css.map
    actual_1 = file_exists(get_path_tmp(filename_1 +'.map'));
    expected_1 = true;

    actual_2 = file_exists(get_path_tmp(filename_2 +'.map'));
    expected_2 = true;

    test.equal(actual_1, expected_1, 'css map must exist - file 1');
    test.equal(actual_2, expected_2, 'css map must exist - file 2');

    test.done();
  },
  
}


function get_path_tmp(filename){
  return path_tmp + filename;
}


function get_path_expected(filename){
  return path_expected + filename;
}


function file_exists(file){
  return grunt.file.exists(file);
}


function read_file_tmp(file){
  return grunt.file.read(get_path_tmp(file));
}


function read_file_expected(file){
  return grunt.file.read(get_path_expected(file));
}