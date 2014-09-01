/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles  = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');

var app = new EmberApp();
app.import('vendor/ember-firebase/ember-firebase.js');

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

var bootstrapDir = 'bower_components/bootstrap-sass-official/assets';

// select bootstrap JavaScript components to include
var bootstrapComponents = ['dropdown', 'alert'];

for (var index in bootstrapComponents) {
  app.import(bootstrapDir + '/javascripts/bootstrap/' + bootstrapComponents[index] + '.js');
}

var extraAssets = pickFiles(bootstrapDir + '/fonts/bootstrap', {
  srcDir: '/',
  destDir: '/assets/bootstrap'
});

module.exports = mergeTrees([app.toTree(), extraAssets]);
