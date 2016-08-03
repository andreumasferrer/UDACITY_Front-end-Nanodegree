module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Create responsive images
    responsive_images: {
      main: {
        options: {
          engine: 'im'
        },
        files: [{
          expand: true,
          cwd: 'src/views/images',
          src: ['**.{jpg,gif,png}'],
          dest: 'src/views/images-responsive'
        }]
      }
    },

    // Clear out the dist directory if it exists
    clean: {
      build: {
        src: ['dist']
      }
    },

    copy: {
      build: {
        expand: true,
        cwd: 'src',
        src: '**',
        dest: 'dist/'
      }
    },

    // Minify HTML files, including inline JavaScript and CSS
    htmlmin: {
      build: {
        options: {
          minifyJS: true,
          minifyCSS: true,
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: true
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.html',
          dest: 'dist'
        }]
      }
    },

    // Minify JavaScript files
    uglify: {
      build: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.js',
          dest: 'dist',
        }]
      }
    },


    // Minify CSS files
    cssmin: {
      build: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.css',
          dest: 'dist',
        }]
      }
    }

  });

  // Enable plugins
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');


  // Default task(s).
  grunt.registerTask('default', ['responsive_images','clean','copy','htmlmin','uglify',
    'cssmin']);

};
