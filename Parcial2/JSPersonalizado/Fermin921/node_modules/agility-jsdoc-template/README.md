[![Build Status](https://agility.visualstudio.com/Agility CMS/_apis/build/status/Agility%20JsDoc%20Template?branchName=master)](https://agility.visualstudio.com/Agility CMS/_build/latest?definitionId=56&branchName=master)

# Agility JsDoc Template

A clean, responsive documentation template theme for JSDoc 3. This has been customized for use with Agility.

[Live Demo](https://agilitydocs.netlify.com/agility-content-fetch-js-sdk/)


## Install

```bash
$ npm install --save-dev agility-jsdoc-template
```


## Usage

Clone repository to your designated `jsdoc` template directory, then:

```bash
$ jsdoc entry-file.js -t path/to/agility-jsdoc-template
```


### Node.js Dependency

In your projects `package.json` file add a generate script:

```json
"script": {
  "generate-docs": "node_modules/.bin/jsdoc --configure .jsdoc.json --verbose"
}
```

In your `.jsdoc.json` file, add a template option.

```json
"opts": {
  "template": "node_modules/agility-jsdoc-template"
}
```


### Example JSDoc Config

```json
{
    "source": {
        "include": ["src", "README.md", "package.json"],
        "includePattern": ".js$",
        "excludePattern": "(node_modules/|docs)"
    },
    "plugins": [
        "plugins/markdown"
    ],
    "recurse": 10,
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": true,
        "useLongnameInNav": true,
        "showInheritedInNav": true
    },
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc"]
    },
    "source-type": "module",
    "opts": {
        "destination": "./docs/",
        "encoding": "utf8",
        "private": false,
        "recurse": true,
        "template": "./node_modules/agility-jsdoc-template"        
    }
}
```

Specifying a number for useLongnameInNav it will be the max number of path elements to show in nav (starting from Class).


## License

Licensed under the Apache2 license.
