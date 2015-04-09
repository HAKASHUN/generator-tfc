'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('tfc') + ' generator!'
    ));

    var prompts = [
      {
        name: 'animationname',
        message: 'What is this animation name?',
        default: path.basename(process.cwd())
      }
    ];

    this.prompt(prompts, function (props) {
      this.animationName = props.animationname;
      done();
    }.bind(this));
  },

  writing: {
    gulpfile: function() {
      this.template('gulpfile.js');
    },
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );

      // create assets directory
      this.mkdir('assets');

      // create public directories
      this.mkdir('public');
      this.mkdir('public/images');
      this.mkdir('public/sprites');

      // create fla name
      var flaNameArray = this.animationName.split('-');
      var flaName = '';
      if (flaNameArray && flaNameArray[1]) {
        flaNameArray.shift();
        flaName = flaNameArray.join('-');
      } else {
        flaName = flaNameArray[0];
      }

      this.fs.copy(
        this.templatePath('_animation.fla'),
        this.destinationPath('public/' + flaName + '.fla')
      );

      // conf
      this.mkdir('conf');
      this.fs.copy(
        this.templatePath('_balmung-assets.json'),
        this.destinationPath('conf/balmung-assets.json')
      );
      this.fs.copy(
        this.templatePath('_balmung-sprites.json'),
        this.destinationPath('conf/balmung-sprites.json')
      );
      this.fs.copy(
        this.templatePath('_balmung-images.json'),
        this.destinationPath('conf/balmung-images.json')
      );

    },
    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
