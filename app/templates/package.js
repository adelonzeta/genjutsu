{
  "name": "<%= name %>",
  "description": "<%= description %>",
  "version": "<%= version %>",
  "main": "<%= main %>",
  "repository": "<%= repository %>",
  "author": "<%= author %>",
  "license": "<%= license %>",
  <% if (framework == 'bootstrap-4' || framework == 'foundation') { %>
  "browser": {
    "jquery": "./node_modules/jquery/dist/jquery.js"<% if (framework == 'bootstrap-4') { %>,
    "popper": "./node_modules/popper.js/dist/umd/popper.js"<% } %>
  },
  "browserify-shim": {
    "jquery": "$"<% if (framework == 'bootstrap-4') { %>,
    "popper": "Popper"<% } %>
  },
  <% } %>
  "babel": {
    "presets": [
      "es2015"
    ]
  },
  "scripts": {
    "start": "gulp",
    "serve": "gulp serve",
    "prod": "gulp prod",
    "deploy": "gulp deploy"
  }
}
