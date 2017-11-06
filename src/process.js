// @flow

import type { PluginOptions } from 'webpack-bump-plugin'

const constants = require('./constants')
const fs = require('fs')
const logger = require('./logger')

module.exports = function process(options: PluginOptions) {
  if (options.enabled) {
    // Parse the target
    const packageRaw = fs.readFileSync(options.target, 'utf8').toString()
    const packageContent = JSON.parse(packageRaw)
    const version = packageContent.version
    const versionparts = version.split(constants.metadataToken)
    const log = logger(options)

    // Update the metadata
    const metadata = (new Date().getTime()).toString()
    versionparts[1] = metadata

    // Update the version and write the file
    const newVersion = versionparts.join(constants.metadataToken)

    // Write away the package
    log(`Bumped version: ${version} -> \x1b[34m${newVersion}\x1b[0m`)
    fs.writeFileSync(
      options.target,
      packageRaw.replace(`"version": "${version}"`, `"version": "${newVersion}"`),
      'utf8')

    log(`Bumping ${options.target}`)
  }
}
