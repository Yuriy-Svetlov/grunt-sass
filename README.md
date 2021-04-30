
# Grunt-sass

[![NPM version](https://img.shields.io/npm/v/grunt-sass-scss.svg)](https://www.npmjs.com/package/grunt-sass-scss) [![Build Status](https://github.com/semiromid/grunt-sass/workflows/Tests/badge.svg)](https://github.com/semiromid/grunt-sass/actions?workflow=Tests)

<table style="width:100%">
  <tr>
    <td>
         <img width="118px" alt="Sass logo" src="https://raw.githubusercontent.com/semiromid/grunt-sass/5434624bc726aeac8e6e22242c820ad88c5981d7/assets/logo.svg" />
    </td>
      <td>
          <h2>Dart Sass for Grunt (2021)</h2>
      </td>
  </tr>
</table>


Compiles Sass / Scss to CSS.  

A [Dart](https://www.dartlang.org) implementation of [Sass](https://sass-lang.com/). **Sass makes CSS fun again**.


## Why this plugin?


- [**Primary implementation of Sass**] Dart Sass is the primary implementation of Sass, which means it gets new features before any other implementation. It's fast, easy to install, and it compiles to pure JavaScript which makes it easy to integrate into modern web development workflows. Find out more or help out with its development on [GitHub](https://github.com/sass/dart-sass).
- [**Warning:**] [LibSass and Node Sass are deprecated](https://sass-lang.com/blog/libsass-is-deprecated).
While they will continue to receive maintenance releases indefinitely, there are no
plans to add additional features or compatibility with any new CSS or Sass features.
Projects that still use it should move onto [Dart Sass](https://sass-lang.com/dart-sass).  Also Dart Sass has replaced **Ruby Sass** as the canonical implementation of the Sass language.
- [**Using all the functionality**] This library uses two Sass functions `render` and `renderSync`. 
- [**Unit tests**] Tests are done.
- [**Additional features**]  So far, there is one additional option. And I am open to adding any functionality that other people need, but if it does not break the current functionality. 


### Important info
`renderSync` is recommended for [Dart Sass](https://github.com/sass). You can read below why.


<a href="https://github.com/webpack-contrib/sass-loader/issues/701#issuecomment-510247135">
   <div><a href="https://github.com/nex3">nex3</a></div>
   <div> (Lead designer and developer of Sass)</div>
</a>

> The logic of compiling Sass—which is by far the bottleneck of Sass
> compilation—is inherently synchronous. There's nothing about parsing
> strings or manipulating ASTs that can be done out-of-process, so
> making it asynchronous doesn't buy you anything in terms of speed (and
> in fact makes it _much_ slower because it has to bounce back to the
> event loop all the time). The only reason it has an asynchronous mode
> at all is to support asynchronous plugins.
> 
> 
> The overhead of running Sass asynchronously tends to range between 2x
> and 3x _the total synchronous compilation time_ for large projects,
> not to mention the memory overhead that
> [@filipesilva](https://github.com/filipesilva) is running into. This
> dwarfs file IO time, which means it's also likely to dwarf the
> benefits you'd get from increased parallelism while waiting on file
> IO.

## Getting Started

```shell
npm install grunt-sass-scss --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sass-scss');
```

### The 'grunt-sass-scss' task

In your project's Gruntfile, add a section named `sass` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sass: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

## Options

#### options.function
* Type: `String`
* Default value: `renderSync`

The function that will be called to compile Sass.  Possible values:  [renderSync](https://sass-lang.com/documentation/js-api#rendersync) | [render](https://sass-lang.com/documentation/js-api#render)

`renderSync` is recommended for [Dart Sass](https://github.com/sass). 

Note however that by default, renderSync() is more than twice as fast as render(), due to the overhead of asynchronous callbacks.

To avoid this performance hit, render() can use the fibers package to call asynchronous importers from the synchronous code path. To enable this, pass the [Fiber](https://www.npmjs.com/package/fibers) class to the fiber option:

```js
var Fiber = require("fibers");

// ...
// Your option should be something like this
// See: https://sass-lang.com/dart-sass
options: {
  function: 'render',     
  sass: {
    importer: function(url, prev, done) {
      // ...
    },
    fiber: Fiber
  }
}
// ...
```

#### options.onError
* Type: `Function`
* Default value: `null`

This function is called when an error occurs and passes the error data.

#### options.sass
* Type: `Object`
* Default value: `{}`

[Dart-Sass options](https://github.com/sass/dart-sass#javascript-api).

## Examples

1.
```js
module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      main: {       
        files: {
          'src/css/main.css': 'src/scss/main.scss'
        }
      }     
    },
  });

  grunt.loadNpmTasks('grunt-sass-scss');
}
```

2.
```js
module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      options: {      
        sass: {
          sourceMap: true
        }
      },   
      main: {       
        files: {
          'src/css/main.css': 'src/scss/main.scss'
        }
      }     
    },
  });

  grunt.loadNpmTasks('grunt-sass-scss');
}
```

3.
```js
module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      options: {
        function: 'render',
        onError: function(error){

        },      
        sass: {
          sourceMap: true
        }
      },   
      main: {       
        files: [{
          expand: true,
          cwd: 'src/scss/',
          src: ['**/*.scss'],
          dest: 'src/css',
          ext: '.css'
        }]
      }     
    },
  });

  grunt.loadNpmTasks('grunt-sass-scss');
}
```