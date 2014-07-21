module.exports = function (grunt) {

//project Config
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  jshint:{
   files:['app/scripts/*.js','tests/unit/*.js','tests/intergration/*.js'],
   options: {
      jshintrc: '.jshintrc',
      reporter: require('jshint-stylish')
    }
  }, //jshint

  uglify:{
    options:{
      compress: {
        drop_console : true
      }
    },
    production: {
      files: {
        'dist/scripts/main.min.js' : ['app/scripts/*.js']
      }
    }
  },

template: {
    dev: {
      src: 'app/views/**/*.ejs',
      dest: 'dist/views/',
      variables: function () {
        console.log(grunt.task.current.fileSrc);
        var dataobj = grunt.file.readJSON('app/views/home/home.json');
        return{
          data: dataobj
        };
      }
    }
  },

  jade: {
        compile: {
            options: {
                client: false,
                pretty: true,
                data: function(dest, src) {
                  var data = src
                  data = src[0].split('.')[0] + '.json'
                    // Resolve file.json in the views/view folder
                  return grunt.file.readJSON(data);
                }
            },
            files: [ {
              cwd: "app/views",
              src: "**/*.jade",
              dest: "dist/views/",
              expand: true,
              ext: ".html"
            } ]
        }
    },

  less: {
    production:{
      options:{
        paths: ["./app/styles/*.less"],
        cleancss: true
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
    files: { src: ['tests/intergration/*.js']}
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
        files:['app/scripts/*.js','tests/unit/*.js','tests/intergration/*.js'],
        tasks: ['jshint']
      },
      jade:{
        files: ['app/views/*.jade'],
        tasks: ['jade']
      },
      scripts:{
        files: ['app/scripts/*.js'],
        tasks:['uglify']
    },
    copy:{
      files:  ['app/vendor/*','app/fonts/*'],
      tasks:['copy:vendor_fonts']
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
grunt.loadNpmTasks('grunt-contrib-jade');
grunt.loadNpmTasks('grunt-ejs');
grunt.loadNpmTasks('grunt-consolidate');
grunt.loadNpmTasks('grunt-templater');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-copy');

grunt.registerTask('default',['concurrent:target1'])
grunt.registerTask('e2e',['concurrent:target2'])
grunt.registerTask('testing',['template'])
grunt.registerTask('prod',['jshint','imagemin','uglify','less:production','jade','copy'])

}//grunt exports
