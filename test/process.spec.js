const assert = require('assert')
const mock = require('mock-fs')
const process = require('../src/process');

before(() => {
  mock({
    './package.json': require('./fixtures/package.json'),
  })
})

after(() => mock.restore())

describe('process', () => {
  it('processes', () => {
    // Arrange
    const options = { enable: false }

    // Act
    process(options)
  })
})
