module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shopify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-exec');

  var is_production = (grunt.option('env') == 'production');

  grunt.initConfig({
    credentials: is_production ? '' : grunt.file.readJSON('credentials.json'),
    url: '',
    shopify: {
      options: {
        api_key: '<%= credentials.api_key %>',
        password: '<%= credentials.password %>',
        url: '<%= url %>',
        theme: '<%= credentials.theme_id %>',
        base: 'compiled/'
      }
    },

    clean: {
      reset: [
        'shop/**/*.*'
      ]
    },

    sass: {
      options: {
        loadPath: ['bower_components/foundation/scss', 'bower_components/slick-carousel/slick', 'bower_components/bevy_core/src/scss']
      },
      development: {
        options: {
          style: 'expanded',
          bundleExec: true
        },
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: ['*.scss'],
          dest: 'shop/assets',
          ext: '.css'
        }]
      },
      production: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
          bundleExec: true
        },
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: ['*.scss'],
          dest: 'shop/assets',
          ext: '.css'
        }]
      }
    },

    sync: {
      jshint: {
        nonull: true,
        src: ['bower_components/bevy_core/.jshintrc'],
        dest: '.jshintrc',
        compareUsing: 'md5'
      },
      core: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/bevy_core/shop/',
            src: ['**'],
            dest: 'compiled/'
          }
        ],
        compareUsing: 'md5'
      },
      local: {
        files: [
          {
            expand: true,
            cwd: 'shop/',
            src: ['**', '!snippets/**', '!templates/**', '!layouts/**'],
            dest: 'compiled/'
          }
        ],
        compareUsing: 'md5'
      }
    },

    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        report: 'min'
      },
      development: {
        options: {
          mangle: false,
          beautify: true,
          compress: false,
          preserveComments: 'all'
        },
        files: {
          'shop/assets/app.min.js': [
            'bower_components/bevy_core/shop/assets/app.min.js',
            'src/js/third_party/**/*.js',
            'src/js/app/**/*.js'
          ]
        }
      },
      production: {
        options: {
          mangle: true,
          compress: {
            drop_console: true
          }
        },
        files: {
          'shop/assets/app.min.js': [
            'bower_components/bevy_core/shop/assets/app.min.js',
            'src/js/third_party/**/*.js',
            'src/js/app/**/*.js'
          ]
        }
      }
    },

    jshint: {
      options: {
        jshintrc: './.jshintrc'
      },
      work: [
        'src/js/app/**/*.js',
        'Gruntfile.js'
      ]
    },

    //Optimisation of image assets.
    imagemin: {
      options: {
        optimizationLevel: 7,
        progressive: true,
        interlaced: true
      },
      assets: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'compiled/assets',
          src: ['**/*.{png,jpg,jpeg,gif,svg}'],
          dest: 'compiled/assets'
        }]
      }
    },

    environment: is_production ? 'production' : 'development',
    watch: {
      js: {
        files: ['src/js/**'],
        tasks: ['jshint', 'uglify:development']
      },
      sass: {
        files: ['src/scss/**'],
        tasks: ['sass:development']
      },
      sync: {
        files: ['bower_components/bevy_core/shop/**', 'shop/**'],
        tasks: ['sync']
      },
      shopify: {
        files: ['compiled/**'],
        tasks: ['shopify'],
        options: {
          livereload: true
        }
      }
    },

    exec: {
      bower_install: {
        command: 'bower install'
      }
    }
  });

  grunt.registerTask('default', ['shopify']);
  grunt.registerTask('compile:development', ['jshint', 'uglify:development', 'sass:development', 'sync']);
  grunt.registerTask('compile:production', ['jshint', 'uglify:production', 'sass:production', 'sync']);
  grunt.registerTask('update_bevy_core', ['exec:bower_install', 'compile:development', 'shopify:upload']);
};