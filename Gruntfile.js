/* eslint-disable */
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-sass');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    builddir: 'src/styles/dist',
    buildtheme: '',
    banner:
      '/*!\n' +
      ' * Bootswatch v<%= pkg.version %>\n' +
      ' * Homepage: <%= pkg.homepage %>\n' +
      ' * Copyright 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * Licensed under <%= pkg.license %>\n' +
      ' * Based on Bootstrap\n' +
      '*/\n',
    swatch: {
      pulse: {},
    },
    clean: {
      build: {
        src: ['src/styles/dist/*/build.scss'],
      },
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false,
      },
      dist: {
        src: [],
        dest: '',
      },
    },
    exec: {
      postcss: {
        command: 'npm run postcss',
      },
    },
    watch: {
      files: ['src/styles/dist/*/_variables.scss', 'src/styles/dist/*/_bootswatch.scss'],
      tasks: 'build',
      options: {
        livereload: true,
        nospawn: true,
      },
    },
    connect: {
      base: {
        options: {
          base: 'docs',
          port: 3000,
          livereload: true,
          open: true
        }
      },
      keepalive: {
        options: {
          port: 3000,
          livereload: true,
          keepalive: true,
          open: true
        }
      }
    }
  });

  grunt.registerTask('none', () => {});

  grunt.registerTask(
    'build',
    'build a regular theme from scss',
    (theme, compress) => {
      theme =
        theme === undefined ? grunt.config('buildtheme') : theme;
      compress = compress === undefined ? true : compress;

      const isValidTheme =
        grunt.file.exists(`src/styles/dist/${theme}`, '_variables.scss') &&
        grunt.file.exists(`src/styles/dist/${theme}`, '_bootswatch.scss');

      // cancel the build (without failing) if this directory is not a valid theme
      if (!isValidTheme) {
        return;
      }
      let concatSrc;
      let concatDest;
      let scssDest;
      let scssSrc;
      let files = {};
      let dist = {};
      concatSrc = 'src/styles/build/scss/build.scss';
      concatDest = `src/styles/dist/${theme}/build.scss`;
      scssSrc = `src/styles/dist/${theme}/build.scss`;
      scssDest = `<%=builddir%>/${theme}/bootstrap.css`;

      dist = {src: concatSrc, dest: concatDest};
      grunt.config('concat.dist', dist);
      files = {};
      files[scssDest] = scssSrc;
      grunt.config('sass.dist.files', files);
      grunt.config('sass.dist.options.outputStyle', 'expanded');

      grunt.task.run([
        'concat',
        'sass:dist',
        'postcss',
        'clean:build',
        compress
          ? `compress:${scssDest}:` +
            `<%=builddir%>/${theme}/bootstrap.min.css`
          : 'none',
      ]);
    },
  );

  grunt.registerTask(
    'compress',
    'compress a generic css with sass',
    (fileSrc, fileDst) => {
      const files = {};
      files[fileDst] = fileSrc;
      grunt.log.writeln(`compressing file ${fileSrc}`);

      grunt.config('sass.dist.files', files);
      grunt.config('sass.dist.options.outputStyle', 'compressed');
      grunt.task.run(['sass:dist']);
    },
  );

  grunt.registerMultiTask('swatch', 'build a theme', function() {
    const t = this.target;
    grunt.task.run(`build:${t}`);
  });

  grunt.registerTask('swatch', 'build a theme from scss ', theme => {
    let t = theme;
    if (!t) {
      for (t in grunt.config('swatch')) {
        grunt.task.run(`build:${t}`);
      }
    } else {
      grunt.task.run(`build:${t}`);
    }
  });

  grunt.event.on('watch', (action, filepath) => {
    const path = require('path');
    const theme = path.basename(path.dirname(filepath));
    console.log(theme);
    grunt.config('buildtheme', theme);
  });

  grunt.registerTask('postcss', 'exec:postcss');

  grunt.registerTask('server', 'connect:keepalive');

  grunt.registerTask('default', ['connect:base', 'watch']);
};
