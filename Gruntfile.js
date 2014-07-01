module.exports = function (grunt) {

//project Config
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  jshint:{
   files:['app/scripts/*.js','tests/unit/*.js','tests/intergration/*.js'],
   options: {
      reporter: require('jshint-stylish')
    }
  }, //jshint

  uglify:{
    options:{
      compress: {
        drop_console : true
      }
    },
    my_target: {
      files: {
        'generated/scripts/main.min.js' : ['app/scripts/*.js']
      }
    }
  },

  less: {
    development: {
      options: {
        paths: ["./app/styles/*.less"],
        cleancss: true
      },
      files: {
        "./app/styles/master.css": "./app/styles/*.less"
      }
    },
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
        dest:'generated/images',
        ext: '.png'
        }]
      },
      jpg:{
      options:{
        porgressive:true,
        },
        files:[{
        expand:true,
        cwd: 'app/',
        src:'app/images/**/.jpg',
        dest:'generated/images',
        ext: '.jpg'
        }]
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

      jshint:{
        files:['app/scripts/*.js','tests/unit/*.js','tests/intergration/*.js'],
        tasks: ['jshint']
      }
    }
  },

  concurrent: {
    target1: ['watch'],
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
grunt.loadNpmTasks('grunt-contrib-imagemin');

grunt.registerTask('default',['concurrent:target1'])
grunt.registerTask('e2e',['concurrent:target2'])
grunt.registerTask('prod',['imagemin'])

}//grunt exports
