module.exports = value => {
  const fail = value.match(/[A-Z]+|\s+/)
  if (fail) {
    return 'Name must be lowecase with no spaces'
  } else {
    return true
  }
}
