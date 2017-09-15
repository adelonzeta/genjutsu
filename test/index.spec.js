const path = require('path')
const helpers = require('yeoman-test')
const assert = require('yeoman-assert')

describe('index', () => {
  before(done => {
    helpers.run(path.join(__dirname, '../app'))
      .on('end', done)
  })

  it('creates expected files', () => {
    assert.file([
      'app/images/favicon.ico',
      'app/layouts/default.html',
      'app/pages/index.html',
      'app/partials/footer.html',
      'app/partials/jumbotron.html',
      'app/partials/navbar.html',
      'app/scripts/app.js',
      'app/styles/app.sass',

      'gulp-tasks/browser-sync.js',
      'gulp-tasks/browserify.js',
      'gulp-tasks/clean.js',
      'gulp-tasks/fonts.js',
      'gulp-tasks/ghpages.js',
      'gulp-tasks/panini.js',
      'gulp-tasks/purifycss.js',
      'gulp-tasks/sass.js',
      'gulp-tasks/watch.js',

      'gulp-tasks/minify/css.js',
      'gulp-tasks/minify/html.js',
      'gulp-tasks/minify/images.js',
      'gulp-tasks/minify/scripts.js',

      'gulpfile.js',
      '.gitignore',
      'package.json',
    ])
  })
})
