**THIS PACKAGE IS STILL IN DEVELOPMENT, DO NOT USE (YET)**


# An easy way to validate forms using back end logic

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-form-backend-validation.svg?style=flat-square)](https://npmjs.com/package/vue-form-backend-validation)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie/vue-form-backend-validation/master.svg?style=flat-square)](https://travis-ci.org/spatie/vue-form-backend-validation)

Wouldn't it be great if you could just use your back end to validate forms on the front end? This package provides a `Form` class does exactly that. It can post itself to a configured endpoint and manage errors. The class meant to be used in a `Vue` component and works out of the box with a Laravel back end.

Take a look at the [usage section](#usage) to view a detailed example on how to use it.

The code of this package is based on the [Object-Oriented Forms lesson](https://laracasts.com/series/learn-vue-2-step-by-step/episodes/19) in the [Vue 2.0 series](https://laracasts.com/series/learn-vue-2-step-by-step/) on [Laracasts](https://laracasts.com/).

## Postcardware

You're free to use this package (it's [MIT-licensed](LICENSE.md)), but if it makes it to your production environment we highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using.

Our address is: Spatie, Samberstraat 69D, 2060 Antwerp, Belgium.

The best postcards will get published on the open source page on our website.

## Install

You can install the package via yarn:

```bash
$ yarn add form-backend-validation
```

## Usage

You find an example implementation with Laravel and Vue in the [spatie/form-backend-validation-example-app repo](https://github.com/spatie/form-backend-validation-example-app). 

```js
import Form from 'form-backend-validation';

//instantiate a form class with some value
const form = new Form({
    field1: 'value 1',
    field2: 'value 2',
});

// submitting the form, you can also use `.put`, `.patch` and `.delete`
form.post(anUrl)
   .then(response => ...)
   .catch(response => ...);

// if there were any errors, you can get to them easily

// returns an object in which the keys are the field names 
// and the values array with error message sent by the server
form.errors.all() 

form.errors.any(); // returns true if there were any error

form.errors.has(fieldName) // return true if there is an error for the given fieldName

form.errors.get(fieldName) // return an array with errors for the given fieldName

form.errors.clear() // forget all errors.
```



## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Testing

``` bash
$ npm run test
```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please contact [Freek Van der Herten](https://github.com/freekmurze) instead of using the issue tracker.

## Credits

- [Freek Van der Herten](https://github.com/freekmurze)
- [All Contributors](../../contributors)

Initial code of this package was copied from [Jeffrey Way](https://twitter.com/jeffrey_way)'s [Vue-Forms repo](https://github.com/laracasts/Vue-Forms/)

## About Spatie
Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
