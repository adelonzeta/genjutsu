const assert = require('assert')
const filter = require('../app/framework-filter')

describe('filter framework', () => {
  const assertions = [
    { value: 'Bootstrap 4', expected: 'bootstrap-4' },
    { value: 'Foundation',  expected: 'foundation' },
    { value: 'Bulma',       expected: 'bulma' },
    { value: 'Bourbon',     expected: 'bourbon' }
  ]

  assertions.map(i => {
    it('expected value', () => {
      assert.equal(filter(i.value), i.expected)
    })
  })
})
