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
    production: {
      files: {
        'generated/scripts/main.min.js' : ['app/scripts/*.js']
      }
    }
  },

  jade: {
        compile: {
            options: {
                client: false,
                pretty: true
            },
            files: [ {
              cwd: "app/views",
              src: "**/*.jade",
              dest: "generated/views/",
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
        "./generated/styles/master.css": "./app/styles/*.less"
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

  copy: {
    main: {
      files: [
        // includes files within path
        {expand: true, src: ['app/fonts/*'], flatten: true, dest: 'generated/fonts', filter: 'isFile'},
        {expand: true, src: ['app/vendor/*'], flatten: true, dest: 'generated/vendor', filter: 'isFile'}
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
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-contrib-copy');

grunt.registerTask('default',['concurrent:target1'])
grunt.registerTask('e2e',['concurrent:target2'])
grunt.registerTask('prod',['jshint','imagemin','uglify','less:production','jade'])

}//grunt exports
