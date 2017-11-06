const fs = require("fs");
const path = require("path");

function BumpPlugin(options) {
    if (!options) {
        options = {};
    }

    // Autoconfigure options
    if (!options.target) {
        options.target = "./package.json";
    }

    // Set the plugin title
    options.title = "BumpPlugin";

    this.options = options;
}

BumpPlugin.prototype.apply = function (compiler) {
    const options = this.options;

    if (options.enabled) {
        compiler.plugin("compile", (compilation) => {
            if (fs.existsSync(options.target)) {
                // Parse the target
                const packageRaw = fs.readFileSync(options.target, "utf8").toString();
                const package = JSON.parse(packageRaw);
                const version = package.version;
                const metadataToken = "+";
                const versionparts = version.split(metadataToken);

                // Update the metadata
                const metadata = (new Date().getTime()).toString();
                versionparts[1] = metadata;

                // Update the version and write the file
                const newVersion = versionparts.join(metadataToken);

                // Write away the package
                console.log(`Bumped version: ${version} -> \x1b[34m${newVersion}\x1b[0m`);
                fs.writeFileSync(
                    options.target,
                    packageRaw.replace(`"version": "${version}"`, `"version": "${newVersion}"`),
                    "utf8");

            } else {
                throw new Error(`${options.title}: ${options.target} does not exist`);
            }
            console.log(`Bumping ${options.target}`);
        });
    }
}

module.exports = BumpPlugin;