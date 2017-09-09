const assert   = require('assert')
const validate = require('../app/name-validation')

describe('validate', () => {
  const invalid = 'Name must be lowecase with no spaces'
  const assertions = [
    { expected: true,    value: 'slkdfjlskdjfdsl' },
    { expected: true,    value: 'awesome-project' },
    { expected: true,    value: 'awesome_project' },
    { expected: true,    value: '198234798317423' },
    { expected: true,    value: '2aldkjsdlfkjsld' },
    { expected: true,    value: 'jksdjfkljfsflk2' },
    { expected: invalid, value: 'Awesome Project' },
    { expected: invalid, value: 'Asdlkfjsdlkfjls' },
    { expected: invalid, value: 'No Not AgainYow' }
  ]

  assertions.map(i => {
    it('expected value', () => {
      assert.equal(validate(i.value), i.expected)
    })
  })
})
