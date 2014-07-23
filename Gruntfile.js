'use strict';
module.exports = function (grunt) {

//project Config
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  jshint:{
   files:['app/scripts/*.js','test/unit/*.js','test/intergration/*.js'],
   options: {
      jshintrc: '.jshintrc',
      ignores: 'app/scripts/bundle.js',
      reporter: require('jshint-stylish')
    }
  }, //jshint

  browserify: {
      dev: {
        files: {
          'dist/scripts/bundle.js': ['app/scripts/bootstrap.js'],
          'app/scripts/bundle.js': ['app/scripts/bootstrap.js']
        },
        options: {
          debug:true
        }
      },
      test: {
        files: {
          'test/browserified.js': ['test/unit/*.js'],
        },
        options: {
          debug:true
        }
      }
    },

  uglify:{
    options:{
      sourceMap: true,
      compress: {
        drop_console : true
      }
    },
    production: {
      files: {
        'dist/scripts/bundle.min.js' : ['app/scripts/*.js']
      }
    }
  },

  jsbeautifier: {
      files: ["app/**/*.js","app/**/*.css","!app/scripts/bundle.*"],
      options: {
        jshintrc: '.jsbeautify'
      },
    },

  less: {
    production:{
      options:{
        paths: ["./app/styles/*.less"],
        cleancss: true,
        sourceMap: true,
        yuicompress: true,
        compress: true,
      },
      files:{
        "./dist/styles/master.css": "./app/styles/*.less"
      }
    }
  },
  imagemin: {
      png: {
        options:{
          optimizationLevel:7
        },
        files:[{
        expand: true,
        cwd: 'app/images/',
        src: ['**/*.png'],
        dest:'dist/images',
        ext: '.png'
        }]
      },
    jpg:{
      options:{
        progressive:true,
        optimizationLevel:7
        },
        files:[{
        expand:true,
        cwd: 'app/images/',
        src:  ["**/*.jpg"],
        dest:'dist/images',
        ext: '.jpg'
        }]
      },
    svgmin:{
      options:{
        optimizationLevel:7,
        plugins: [
            { removeViewBox: false },               // don't remove the viewbox atribute from the SVG
            { removeUselessStrokeAndFill: false },  // don't remove Useless Strokes and Fills
            { removeEmptyAttrs: false }             // don't remove Empty Attributes from the SVG
         ]
        },
        files:[{
        expand:true,
        cwd: 'app/images/',
        src:  ["**/*.svg"],
        dest:'dist/images',
        ext: '.min.svg'
        }]
      },
    gif: {
        options:{
          optimizationLevel:7,
          interlaced: true
        },
        files:[{
        expand: true,
        cwd: 'app/images/',
        src: ['**/*.gif'],
        dest:'dist/images',
        ext: '.gif'
        }]
      },
    },

  copy: {
    vendor_fonts: {
      files: [
        // includes files within path
        {expand: true, cwd: 'app/vendor/', src: ['**/*'],  dest: 'dist/vendor/'},
        {expand: true, cwd: 'app/fonts/', src: ['**/*'], dest: 'dist/fonts/'}
      ]
    },
    php_html:{
      files:[
      {expand: true, cwd:'app/views/',src: ['**/*.php'], dest: 'dist/views/'},
      {expand: true, cwd:'app/views/',src: ['**/*.html'], dest: 'dist/views/'}
      ]
    }
  },


  casperjs: {
    options: {
      async : {
        parrallel: true
      }
    },
    files: { src: ['test/intergration/*.js']}
  },

  watch:{
      options:{
        livereload:true,
      },
    css:{
      files:'app/styles/*.less',
      tasks: ['less'],
    },
     jshint:{
        files:['app/scripts/*.js','test/unit/*.js','test/intergration/*.js'],
        tasks: ['jshint']
      },
    scripts:{
      files: ['app/scripts/*.js'],
      tasks:['jsbeautifier','browserify','uglify']
    },
    copy:{
      files:  ['app/vendor/*','app/fonts/*','app/views/**/*'],
      tasks:['copy']
    }
  },

  concurrent: {
    target1: ['watch','copy'],
    target2: ['casperjs'],
    options:{
      logConcurrentOutput:true
    }
  }

});//Grunt init


grunt.loadNpmTasks('grunt-casperjs');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-concurrent');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-jsbeautifier');
grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-copy');

grunt.registerTask('default',['concurrent:target1'])
grunt.registerTask('test',['browserify:test'])
grunt.registerTask('e2e',['concurrent:target2'])
grunt.registerTask('prod',['jshint','imagemin','uglify','less:production','copy'])

}//grunt exports
