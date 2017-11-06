const assert = require('assert')
const process = require('../lib/process')
const constants = require('../lib/constants')

beforeEach(() => {
  global.console = { log: jest.fn() }
})

afterEach(() => {
  global.content = null
})

describe('process', () => {
  test('Don\'t run disabled process', () => {
    // Arrange
    const options = { enable: false }

    // Act
    process(options)
  })

  test('Runs process, file should be written', () => {
    // Arrange
    const options = { enabled: true, target: 'package.json' }
    // Act
    process(options)

    // Assert
    expect(global.content).not.toBeNull()
  })

  test('Runs process, version should be bumped', () => {
    // Arrange
    const options = { enabled: true, target: 'package.json' }
    // Act
    process(options)
    const content = JSON.parse(global.content)
    const version = content.version

    // Assert
    expect(version.split(constants.metadataToken).length).toBe(2);
  })

  test('Runs process, version should be bumped and parseable', () => {
    // Arrange
    const options = { enabled: true, target: 'package.json' }
    const date = new Date()

    // Act
    process(options)
    const content = JSON.parse(global.content)
    const version = content.version
    const timestamp = version.split(constants.metadataToken)[1]

    // Assert
    expect(timestamp).not.toBeNull()
    expect(parseInt(timestamp, 10)).not.toBeNaN()
    expect(parseInt(timestamp, 10)).toBeGreaterThan(0)
    expect(parseInt(timestamp, 10) - (date.getTime())).toBeLessThan(1000)
  })

  test('Runs process verbose, logging should happen', () => {
    // Arrange
    const options = { enabled: true, verbose: true, target: 'package.json' }
    // Act
    process(options)

    // Assert
    expect(console.log).toBeCalled()
  })

  test('Runs process, logging should not happen', () => {
    // Arrange
    const options = { enabled: true, target: 'package.json' }
    // Act
    process(options)

    // Assert
    expect(console.log).not.toBeCalled()
  })
})
