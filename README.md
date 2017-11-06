# Webpack bump plugin

> Adds a semver compliant build timestamp to your package.json version

The semver specification adds the possibility to add **build metadata** to your versionning. In some cases it can be handy to include the time of build into your version to track when a specific (deployed) version was build. This webpack plugin does exact that. It adds a build number to your given version and writes away the package.json file.

Before: `2.0.35`, and after: `2.0.35+1508831283188`. The metadata is a **timestamp** and can easily be converted to a date: `new Date(1508831283188)`.

**Read more** [http://semver.org/#spec-item-10](http://semver.org/#spec-item-10).

## Usage

```javascript
var bump = require("webpack-bump-plugin");

// Your webpack config
var config = {
    // ...
    plugins: [
        new bump(/* options */),
    ]
};

```

### Options
An options object can be provided in the constructor. It contains the following properties:

- **enabled** (optional, boolean): indicates whether the plugin is enabled, default `true`
- **target** (optional, string): the path to the package.json file, default `"./package.json"`