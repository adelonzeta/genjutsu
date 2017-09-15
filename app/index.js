const Generator = require('yeoman-generator')
const yosay     = require('yosay')
const parse     = require('parse-git-config')
const config    = parse.sync()
const bold      = require('chalk').bold
const replace   = require('lodash/replace')
const startCase = require('lodash/startCase')
const kebabCase = require('lodash/kebabCase')

module.exports = class extends Generator {
  initializing() {
    this.pkg               = require('../package.json')
    this.frameworkFilter   = require('./framework-filter')
    this.nameValidation    = require('./name-validation')
    this.versionValidation = require('./version-validation')
    try {
      this.repo = config['remote "origin"'].url
    } catch(e) {
      this.repo = null
    }
    this.log(bold(`${replace(this.pkg.name, 'generator-', '')} v${this.pkg.version}`))
    this.log(yosay('Yow Ninja! Out of the box I include Panini, Sass, and a gulpfile to build your app.'))
  }
  prompting() {
    return this.prompt([{
      type: 'list',
      name: 'framework',
      message: 'Which framework do you want to use?',
      choices: [
        'Bulma',
        'Bootstrap 4',
        'Bourbon',
        'Foundation'
      ],
      filter: this.frameworkFilter
    }, {
      type    : 'input',
      name    : 'name',
      message : 'project name:',
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
      this.framework        = answers.framework
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
      this.templatePath('package.js'),
      this.destinationPath('package.json'),
      {
        framework   : this.framework,
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
    this.fs.copyTpl(
      this.templatePath('gulp-tasks'),
      this.destinationPath('gulp-tasks'),
      { framework: this.framework }
    )
  }
  _writingAppFiles() {
    this.fs.copyTpl(
      this.templatePath('app'),
      this.destinationPath('app'),
      { framework: this.framework }
    )
  }
  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true,
      skipInstall: this.options['skip-install']
    })
  }
}
