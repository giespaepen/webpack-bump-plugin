// @flow

import type { PluginOptions } from 'webpack-bump-plugin'

const constants = require('./constants')
const process = require('./process')

/**
 * Configure the plugin
 * @param {PluginOptions} options
 */
function BumpPlugin(options: ?PluginOptions) {
  if (!options) {
    options = {
      target: constants.defaultTarget,
      title: constants.defaultTitle,
      enabled: constants.defaultEnabled,
      verbose: false,
    }
  } else {
    // Autoconfigure options
    if (!options.target) {
      options.target = './package.json'
    }

    // Autoconfigure enabled
    if (options.enabled === undefined) {
      options.enabled = true
    }

    // Set the plugin title
    options.title = 'BumpPlugin'
  }

  // Set the options
  this.options = options
}

/**
 * Implement the plugin
 */
BumpPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compile', (compilation) => process(this.options))
}

module.exports = BumpPlugin
