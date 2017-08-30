# An easy way to validate forms using back end logic

[![Latest Version on NPM](https://img.shields.io/npm/v/form-backend-validation.svg?style=flat-square)](https://npmjs.com/package/form-backend-validation)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie/form-backend-validation/master.svg?style=flat-square)](https://travis-ci.org/spatie/form-backend-validation)
[![npm](https://img.shields.io/npm/dt/form-backend-validation.svg?style=flat-square)](https://npmjs.com/package/form-backend-validation)

Wouldn't it be great if you could just use your back end to validate forms on the front end? This package provides a `Form` class does exactly that. It can post itself to a configured endpoint and manage errors. The class meant to be used with a Laravel back end.

Take a look at the [usage section](#usage) to view a detailed example on how to use it.

The code of this package is based on the [Object-Oriented Forms lesson](https://laracasts.com/series/learn-vue-2-step-by-step/episodes/19) in the [Vue 2.0 series](https://laracasts.com/series/learn-vue-2-step-by-step/) on [Laracasts](https://laracasts.com/).

## Postcardware

You're free to use this package (it's [MIT-licensed](LICENSE.md)), but if it makes it to your production environment we highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using.

Our address is: Spatie, Samberstraat 69D, 2060 Antwerp, Belgium.

The best postcards will get published on the open source page on our website.

## Install

You can install the package via yarn (or npm):

```bash
$ yarn add form-backend-validation
```

By default, this package expects `axios` to be installed (unless you're using your own http library, see the [Options](#options) section for that).

```bash
$ yarn add axios
```

## Usage

You find an example implementation with Laravel and Vue in the [spatie/form-backend-validation-example-app repo](https://github.com/spatie/form-backend-validation-example-app). 

![Screenshot](https://raw.githubusercontent.com/spatie/form-backend-validation-example-app/master/public/images/screenshot.png)

```js
import Form from 'form-backend-validation';

// Instantiate a form class with some values
const form = new Form({
    field1: 'value 1',
    field2: 'value 2',
    person: {
        first_name: 'John',
        last_name: 'Doe',
    },
});

// A form can also be initiated with an array
const form = new Form(['field1', 'field2']);

// Submit the form, you can also use `.put`, `.patch` and `.delete`
form.post(anUrl)
   .then(response => ...)
   .catch(response => ...);

// Returns true if request is being executed
form.processing;

// If there were any validation errors, you easily access them

// Example error response (json)
{
    "errors": {
        "field1": ['Value is required'],
        "field2": ['Value is required']
    }
}

// Returns an object in which the keys are the field names 
// and the values array with error message sent by the server
form.errors.all();

// Returns true if there were any error
form.errors.any();

// Returns true if there is an error for the given field name or object
form.errors.has(key);

// Returns the first error for the given field name
form.errors.first(key);

// Returns an array with errors for the given field name
form.errors.get(key);

// Shortcut for getting the errors for the given field name
form.getError(key);

// Clear all errors
form.errors.clear();


// Clear the error of the given field name or all errors on the given object
form.errors.clear(key);

// Reset the values of the form to those passed to the constructor
form.reset();

// Set the values which should be used when calling reset()
form.setInitialValues();

```

### Options

The `Form` class accepts a second `options` parameter.

```js
const form = new Form({
    field1: 'value 1',
    field2: 'value 2',
}, {
    resetOnSuccess: false,
});
```

You can also pass options via a `withOptions` method (this example uses the `create` factory method.

```
const form = Form.create()
    .withOptions({ resetOnSuccess: false })
    .withData({
        field1: 'value 1',
        field2: 'value 2',
    });
```

#### `resetOnSuccess: bool`

Default: `true`. Set to `false` if you don't want the form to reset to it's original values after a succesfull submit.

#### `http: Object`

By default this library uses axios for http request. If you want, you can roll with your own http library (or your own axios instance).

*Advanced!* Pass a custom http library object. Your http library needs to adhere to the following interface for any http method you're using:

```ts
method(url: string, data: Object): Promise<Response>
```

Supported http methods are `get`, `delete`, `head`, `post`, `put` & `patch`.

If you want to see how the http library is used internally, refer to the `Form` class' `submit` method.

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
- [Sebastian De Deyne](https://github.com/sebastiandedeyne)
- [All Contributors](../../contributors)

Initial code of this package was copied from [Jeffrey Way](https://twitter.com/jeffrey_way)'s [Vue-Forms repo](https://github.com/laracasts/Vue-Forms/).

The idea to go about this way of validating forms comes from [Laravel Spark](https://spark.laravel.com/).

## About Spatie

Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
