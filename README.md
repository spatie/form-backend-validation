# :package_name

[![Latest Version on NPM](https://img.shields.io/npm/v/:package_name.svg?style=flat-square)](https://npmjs.com/package/:package_name)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/:github_organization/:package_name/master.svg?style=flat-square)](https://travis-ci.org/:github_organization/:package_name)

**Don't forget:**
Replace ```:author_name``` ```:author_username``` ```:package_name``` ```:package_description``` ```:github_organization``` with their correct values in [README.md](README.md), [CHANGELOG.md](CHANGELOG.md), [CONTRIBUTING.md](CONTRIBUTING.md), [LICENSE.md](LICENSE.md) and [package.json](package.json) files.

This is where your description should go. Try and limit it to a paragraph or two, and maybe throw in a mention of what
PSRs you support to avoid any confusion with users and contributors.

## Postcardware

You're free to use this package (it's [MIT-licensed](LICENSE.md)), but if it makes it to your production environment we highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using.

Our address is: Spatie, Samberstraat 69D, 2060 Antwerp, Belgium.

The best postcards will get published on the open source page on our website.

## Install

**Private package installation**

This package is custom built for [Spatie](https://spatie.be) projects and is therefore not registered on npm.
In order to install it via yarn you have to go through out registry:

```bash
npm set registry https://npm.spatie.be
npm set ca null
```

Or you can require the package straight from Github:

```bash
yarn add spatie-custom/:package_name
```

**Public package installation**

You can install the package via yarn:

```bash
$ yarn add :package_name
```

## Usage

```js
const myPackage = require('my-package');

myPackage.doStuff();
```

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Testing

``` bash
$ npm run test
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please contact [:author_name](https://github.com/:author_username) instead of using the issue tracker.

## Credits

- [:author_name](https://github.com/:author_username)
- [All Contributors](../../contributors)

## About Spatie
Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
