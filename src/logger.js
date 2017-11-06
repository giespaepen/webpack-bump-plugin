// @flow

import type { PluginOptions } from 'webpack-bump-plugin'

module.exports = function logger(options: PluginOptions) {
  return (...args?: any[]) => {
    if (options.verbose) {
      console.log(...args)
    }
  }
}
