const Generator = require('yeoman-generator')
const yosay     = require('yosay')
const parse     = require('parse-git-config')
const config    = parse.sync()
const bold      = require('chalk').bold
const green     = require('chalk').green.bold
const replace   = require('lodash/replace')
const startCase = require('lodash/startCase')
const kebabCase = require('lodash/kebabCase')

module.exports = class extends Generator {
  initializing() {
    this.pkg               = require('../package.json')
    this.nameValidation    = require('./name-validation')
    this.versionValidation = require('./version-validation')
    this.dependencies      = require('./dependencies')
    this.devDependencies   = require('./dev-dependencies')
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
      default : kebabCase(this.appname),
      validate: this.nameValidation
    }, {
      type    : 'input',
      name    : 'version',
      message : 'version:',
      default : '1.0.0',
      validate: this.versionValidation
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
      this.templatePath('gulp-tasks'),
      this.destinationPath('gulp-tasks')
    )
  }
  _writingAppFiles() {
    this.fs.copy(
      this.templatePath('app'),
      this.destinationPath('app')
    )
  }
  install() {
    this.yarnInstall(this.dependencies)
    this.yarnInstall(this.devDependencies, { 'dev': true })
  }
  end() {
    this.log(`Run ${green('yarn serve')} to start server.`)
  }
}
