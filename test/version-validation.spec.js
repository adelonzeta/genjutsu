const assert   = require('assert')
const validate = require('../app/version-validation')

describe('validate', () => {
  const invalid = 'Please enter a valid version number'
  const assertions = [
    { expected: true,    value: '0.0.0' },
    { expected: true,    value: '12.12.12' },
    { expected: true,    value: '123.123.123' },
    { expected: true,    value: '123456789.123456789.123456789' },
    { expected: invalid, value: '0' },
    { expected: invalid, value: '12' },
    { expected: invalid, value: '123' },
    { expected: invalid, value: '123456789' },
    { expected: invalid, value: '0.0' } ,
    { expected: invalid, value: '12.12' },
    { expected: invalid, value: '1232143.324234' },
    { expected: invalid, value: 'asdf.0.0' },
    { expected: invalid, value: '0.sdf.0' },
    { expected: invalid, value: '0.0.sdlfkj' },
    { expected: invalid, value: 'sldfjl.sdlkfj.sdf' }
  ]

  assertions.map(i => {
    it('expected value', () => {
      assert.equal(validate(i.value), i.expected)
    })
  })
})
