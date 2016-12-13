// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'angular-cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-remap-istanbul'),
      require('angular-cli/plugins/karma')
    ],
    files: [
      { 
        pattern: './src/test.ts', watched: false 
      },
      './node_modules/three/build/three.min.js',
      './node_modules/three/examples/js/controls/VRControls.js',
      './node_modules/three/examples/js/effects/VREffect.js',
      './node_modules/webvr-boilerplate/build/webvr-manager.js'
//      './node_modules/dat-gui/vendor/dat.gui.js'
    ],
    preprocessors: {
      './src/test.ts': ['angular-cli']
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters: ['progress', 'karma-remap-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    //browsers: ['Chrome'],
    browsers: ['Firefox'],
    singleRun: false
  });
};
