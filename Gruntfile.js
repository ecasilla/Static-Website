'use strict';
module.exports = function(grunt) {

    //project Config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: ['app/scripts/*.js', 'test/unit/*.js', 'test/intergration/*.js'],
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
                    debug: true
                }
            },
            test: {
                files: {
                    'test/browserified.js': ['test/unit/*.js'],
                },
                options: {
                    debug: true
                }
            }
        },

        uglify: {
            options: {
                sourceMap: true,
                compress: {
                    drop_console: true
                }
            },
            production: {
                files: {
                    'dist/scripts/bundle.min.js': ['app/scripts/*.js']
                }
            }
        },

        jsbeautifier: {
            files: ["app/**/*.js", "app/**/*.css", "Gruntfile.js", "!app/scripts/bundle.*"],
            options: {
                jshintrc: '.jsbeautify'
            },
        },

        less: {
            production: {
                options: {
                    paths: ["./app/styles/*.less"],
                    cleancss: true,
                    sourceMap: true,
                    yuicompress: true,
                    compress: true,
                },
                files: {
                    "./dist/styles/master.css": "./app/styles/*.less"
                }
            }
        },
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'app/images/',
                    src: ['**/*.png'],
                    dest: 'dist/images',
                    ext: '.png'
                }]
            },
            jpg: {
                options: {
                    progressive: true,
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'app/images/',
                    src: ["**/*.jpg"],
                    dest: 'dist/images',
                    ext: '.jpg'
                }]
            },
            svgmin: {
                options: {
                    optimizationLevel: 7,
                    plugins: [{
                            removeViewBox: false
                        }, // don't remove the viewbox atribute from the SVG
                        {
                            removeUselessStrokeAndFill: false
                        }, // don't remove Useless Strokes and Fills
                        {
                            removeEmptyAttrs: false
                        } // don't remove Empty Attributes from the SVG
                    ]
                },
                files: [{
                    expand: true,
                    cwd: 'app/images/',
                    src: ["**/*.svg"],
                    dest: 'dist/images',
                    ext: '.min.svg'
                }]
            },
            gif: {
                options: {
                    optimizationLevel: 7,
                    interlaced: true
                },
                files: [{
                    expand: true,
                    cwd: 'app/images/',
                    src: ['**/*.gif'],
                    dest: 'dist/images',
                    ext: '.gif'
                }]
            },
        },

        copy: {
            vendor_fonts: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        cwd: 'app/vendor/',
                        src: ['**/*'],
                        dest: 'dist/vendor/'
                    }, {
                        expand: true,
                        cwd: 'app/fonts/',
                        src: ['**/*'],
                        dest: 'dist/fonts/'
                    }
                ]
            },
            php_html: {
                files: [{
                    expand: true,
                    cwd: 'app/views/',
                    src: ['**/*.php'],
                    dest: 'dist/views/'
                }, {
                    expand: true,
                    cwd: 'app/views/',
                    src: ['**/*.html'],
                    dest: 'dist/views/'
                }]
            },
            spec: {
                expand: true,
                cwd: 'app/scripts',
                nonull: true,
                src: ['**/**.js', '!bundle.js'],
                dest: 'test/unit/',
                filter: function(filepath) {
                    var path = require('path');
                    var dest = path.join(
                        grunt.config('copy.spec.dest'),
                        filepath.split(path.sep).slice(2).join(path.sep)
                    );
                    return !(grunt.file.exists(dest));
                },
                rename: function(dest, src) {
                    var src_spec = src.split('.')[0] + "_spec.js"
                    return dest + src_spec;
                },
                options: {
                    process: function(content, srcpath) {
                        console.log("STARTING Replace", " ", srcpath)
                        var varName = srcpath.split('/')[2].split('.')[0]
                        var require = "var " + varName + " = " + "require('" + '../../' + srcpath + "');"
                        return content = content.replace(/(.|\n)/g, require);
                    }
                }
            }
        },

        plato: {
          lint: {
            options : {
              jshint : grunt.file.readJSON('.jshintrc'),
              dir: "reports",
              title: grunt.file.readJSON('package.json').name,
              complexity:{
                minmi:true,
                forin:true,
                logicalor:false
              }
            },
            files: {
              'reports': ['app/scripts/**/*.js']
            }
          },
        },

        mocha_istanbul: {
            coverage: {
                src: 'test/unit',
                options: {
                    check: {
                        lines: 75,
                        statements: 75,
                        branches: 75,
                        functions: 75
                    },
                    mask: '*.js',
                    instrument: ['test'],
                    coverageFolder: "reports/coverage",
                    reporter: "html-cov",
                    ui: 'bdd',
                    root: 'app/scripts/',
                    print: 'summary',
                    excludes: ['node_modules', 'dist']
                }
            }
        },

        casperjs: {
            options: {
                async: {
                    parrallel: true
                }
            },
            files: {
                src: ['test/intergration/*.js']
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: 'app/styles/*.less',
                tasks: ['newer:less'],
            },
            jshint: {
                files: ['app/scripts/*.js', 'test/unit/*.js', 'test/intergration/*.js'],
                tasks: ['newer:jshint']
            },
            scripts: {
                files: ['app/scripts/*.js'],
                tasks: ['newer:jsbeautifier', 'newer:browserify', 'newer:uglify']
            },
            spec: {
                files: ['app/scripts/*.js', '!app/scripts/bundle.js'],
                tasks: ['copy:spec'],
                options: {
                    event: ['added']
                }
            },
            copy: {
                files: ['app/vendor/*', 'app/fonts/*', 'app/views/**/*'],
                tasks: ['newer:copy']
            }
        },

        concurrent: {
            target1: ['watch', 'copy'],
            target2: ['casperjs'],
            options: {
                logConcurrentOutput: true
            }
        }

    }); //Grunt init



    // Loading dependencies
    for (var key in grunt.file.readJSON("package.json").devDependencies) {
        if (key.indexOf("grunt") === 0 && key !== "grunt") {
            grunt.loadNpmTasks(key);
        }
    }

    grunt.registerTask('default', ['concurrent:target1'])
    grunt.registerTask('test', ['newer:browserify:test'])
    grunt.registerTask('coverage', ['mocha_istanbul',"plato"])
    grunt.registerTask('e2e', ['concurrent:target2'])
    grunt.registerTask('prod', ['jshint', 'imagemin', 'uglify', 'less:production', 'copy'])

} //grunt exports
