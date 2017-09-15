{
  "name": "<%= name %>",
  "description": "<%= description %>",
  "version": "<%= version %>",
  "main": "<%= main %>",
  "repository": "<%= repository %>",
  "author": "<%= author %>",
  "license": "<%= license %>",
  <%_ if (framework == 'bootstrap-4' || framework == 'foundation') { _%>
  "browser": {
    "jquery": "./node_modules/jquery/dist/jquery.js"<% if (framework == 'bootstrap-4') { %>,
    "popper": "./node_modules/popper.js/dist/umd/popper.js"<% } %>
  },
  "browserify-shim": {
    "jquery": "$"<% if (framework == 'bootstrap-4') { %>,
    "popper": "Popper"<% } %>
  },
  <%_ } _%>
  "babel": {
    "presets": [
      "es2015"
    ]
  },
  "dependencies" : {
    <%_ if (framework == 'bootstrap-4') { _%>
    "bootstrap": "4.0.0-beta",
    "popper.js": "^1.12.5",
    <%_ } _%>
    <%_ if (framework == 'bourbon') { _%>
    "bourbon": "^4.3.4",
    "bourbon-neat": "^1.9.0",
    <%_ } _%>
    <%_ if (framework == 'bulma') { _%>
    "bulma": "^0.5.1",
    <%_ } _%>
    <%_ if (framework == 'foundation') { _%>
    "foundation-sites": "^6.4.3",
    <%_ } _%>
    <%_ if (framework == 'bootstrap-4' || framework == 'foundation') { _%>
    "jquery": "^3.2.1",
    <%_ } _%>
    "font-awesome": "^4.7.0"
  },
  "devDependencies": {
    "babel-preset-es2015": "^6.24.1",
    "babelify": "^7.3.0",
    "browser-sync": "^2.18.13",
    "browserify": "^14.4.0",
    "browserify-shim": "^3.8.14",
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^4.0.0",
    "gulp-clean": "^0.3.2",
    "gulp-defer": "^1.1.2",
    "gulp-gh-pages": "^0.5.4",
    "gulp-htmlmin": "^3.0.0",
    "gulp-imagemin": "^3.3.0",
    "gulp-minify": "^1.0.0",
    "gulp-purifycss": "^0.2.0",
    "gulp-sass": "^3.1.0",
    "gulp-sourcemaps": "^2.6.1",
    "gulp-strip-css-comments": "^1.2.0",
    "gulp-task-loader": "^1.4.4",
    "panini": "^1.5.1",
    "vinyl-source-stream": "^1.1.0"
  },
  "scripts": {
    "start": "gulp",
    "serve": "gulp serve",
    "prod": "gulp prod",
    "deploy": "gulp deploy"
  }
}
