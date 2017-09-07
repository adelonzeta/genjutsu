const Generator = require('yeoman-generator')
const yosay     = require('yosay')
const parse     = require('parse-git-config')
const config    = parse.sync()
const bold      = require('chalk').bold
const green     = require('chalk').green.bold
const replace   = require('lodash/replace')
const startCase = require('lodash/startCase')
const validate = require('./validate')

module.exports = class extends Generator {
  initializing() {
    this.pkg = require('../package.json')
    try {
      this.repo = config['remote "origin"'].url
    } catch(e) {
      this.repo = null
    }
    this.log(bold(`${replace(this.pkg.name, 'generator-', '')} v${this.pkg.version}`))
    this.log(yosay('Yow Ninja! Out of the box I include Bootstrap 4, jQuery, and a gulpfile to build your app.'))
  }
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'name:',
      default : this.appname
    }, {
      type    : 'input',
      name    : 'version',
      message : 'version:',
      default : '1.0.0',
      validate: validate
    }, {
      type    : 'input',
      name    : 'description',
      message : 'description:'
    }, {
      type    : 'input',
      name    : 'entryPoint',
      message : 'entry point:',
      default : 'index.js'
    }, {
      type    : 'input',
      name    : 'gitRepository',
      message : 'git repository:',
      default : this.repo
    }, {
      type    : 'input',
      name    : 'author',
      message : 'author:'
    }, {
      type    : 'input',
      name    : 'license',
      message : 'license:',
      default : 'MIT'
    }]).then(answers => {
      this.pkgName          = answers.name
      this.pkgVersion       = answers.version
      this.pkgDescription   = answers.description
      this.pkgEntryPoint    = answers.entryPoint
      this.pkgGitRepository = answers.gitRepository
      this.pkgAuthor        = answers.author
      this.pkgLicense       = answers.license
    })
  }
  writing() {
    this._writingGitIgnore()
    this._writingPackageJSON()
    this._writingGulpFile()
    this._writingGulpTasks()
    this._writingAppFiles()
  }
  _writingGitIgnore() {
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    )
  }
  _writingPackageJSON() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name        : this.pkgName,
        version     : this.pkgVersion,
        description : this.pkgDescription,
        main        : this.pkgEntryPoint,
        repository  : this.pkgGitRepository,
        author      : this.pkgAuthor,
        license     : this.pkgLicense
      }
    )
  }
  _writingGulpFile() {
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    )
  }
  _writingGulpTasks() {
    this.fs.copy(
      this.templatePath('gulp-tasks/browser-sync.js'),
      this.destinationPath('gulp-tasks/browser-sync.js')
    )
    this.fs.copy(
      this.templatePath('gulp-tasks/browserify.js'),
      this.destinationPath('gulp-tasks/browserify.js')
    )
    this.fs.copy(
      this.templatePath('gulp-tasks/clean.js'),
      this.destinationPath('gulp-tasks/clean.js')
    )
    this.fs.copy(
      this.templatePath('gulp-tasks/ghpages.js'),
      this.destinationPath('gulp-tasks/ghpages.js')
    )
    this.fs.copy(
      this.templatePath('gulp-tasks/panini.js'),
      this.destinationPath('gulp-tasks/panini.js')
    )
    this.fs.copy(
      this.templatePath('gulp-tasks/purifycss.js'),
      this.destinationPath('gulp-tasks/purifycss.js')
    )
    this.fs.copy(
      this.templatePath('gulp-tasks/sass.js'),
      this.destinationPath('gulp-tasks/sass.js')
    )
    this.fs.copy(
      this.templatePath('gulp-tasks/watch.js'),
      this.destinationPath('gulp-tasks/watch.js')
    )
    this.fs.copy(
      this.templatePath('gulp-tasks/minify/css.js'),
      this.destinationPath('gulp-tasks/minify/css.js')
    )
    this.fs.copy(
      this.templatePath('gulp-tasks/minify/html.js'),
      this.destinationPath('gulp-tasks/minify/html.js')
    )
    this.fs.copy(
      this.templatePath('gulp-tasks/minify/images.js'),
      this.destinationPath('gulp-tasks/minify/images.js')
    )
    this.fs.copy(
      this.templatePath('gulp-tasks/minify/scripts.js'),
      this.destinationPath('gulp-tasks/minify/scripts.js')
    )
  }
  _writingAppFiles() {
    this.fs.copy(
      this.templatePath('app/images/favicon.png'),
      this.destinationPath('app/images/favicon.png')
    )
    this.fs.copyTpl(
      this.templatePath('app/layouts/default.html'),
      this.destinationPath('app/layouts/default.html'),
      { name: startCase(this.pkgName) }
    )
    this.fs.copy(
      this.templatePath('app/pages/index.html'),
      this.destinationPath('app/pages/index.html')
    )
    this.fs.copyTpl(
      this.templatePath('app/partials/hello.html'),
      this.destinationPath('app/partials/hello.html'),
      {
        title: startCase(this.pkgName),
        description: this.pkgDescription
      }
    )
    this.fs.copy(
      this.templatePath('app/scripts/app.js'),
      this.destinationPath('app/scripts/app.js')
    )
    this.fs.copy(
      this.templatePath('app/styles/app.sass'),
      this.destinationPath('app/styles/app.sass')
    )
  }
  install() {
    this.yarnInstall([
      'bootstrap@4.0.0-beta',
      'jquery',
      'popper.js'
    ])
    this.yarnInstall([
      'babel-preset-es2015',
      'babelify',
      'browser-sync',
      'browserify',
      'browserify-shim',
      'gulp',
      'gulp-autoprefixer',
      'gulp-clean',
      'gulp-defer',
      'gulp-gh-pages',
      'gulp-htmlmin',
      'gulp-imagemin',
      'gulp-minify',
      'gulp-purifycss',
      'gulp-sass',
      'gulp-sourcemaps',
      'gulp-strip-css-comments',
      'gulp-task-loader',
      'panini',
      'vinyl-source-stream'
    ], { 'dev': true })
  }
  end() {
    this.log(`Run ${green('yarn serve')} to start server.`)
  }
}
