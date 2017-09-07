module.exports = value => {
  const pass = value.match(/\d+\.\d+\.\d+/)
  if (pass) {
    return true
  } else {
    return 'Please enter a valid version number'
  }
}
