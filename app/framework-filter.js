const kebabCase = require('lodash/kebabCase')
const toLower   = require('lodash/toLower')

module.exports = val => kebabCase(toLower(val))
