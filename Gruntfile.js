module.exports = function (grunt) {

//project Config
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  jshint:{
   files:['app/scripts/*.js','tests/**/*.js'],
   globals:{
    jQuery: true,
    console: true,
    module: true,
    beforeEach: true,
    AfterEach: true,
    confirm: true,
    context: true,
    describe: true,
    expect: true,
    it: true,
    spyOn: true,
    spyOnEvent: true,
    waitsFor: true,
    xdescribe: true
   },
   options: {
    curly : true,
    eqeqeq : true,
    immed : true,
    latedef : true,
    newcap : true,
    noarg : true,
    sub : true,
    undef : true,
    boss : true,
    eqnull : true,
    unused : true,
    camelcase : true,
    onevar : true,
    forin : true,
    browser : true,
    jquery : true
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
  casperjs: {
    options: {
      async : {
        parrallel: true
      }
    },
    files: { src: ['tests/intergration/*.js']}
  },

  watch:{
    css:{
      files:'app/styles/*.less',
      tasks: ['less'],
      options:{
        livereload:true,
      },
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

grunt.registerTask('default',['concurrent:target1'])
grunt.registerTask('e2e',['concurrent:target2'])

}//grunt exports
