# An easy way to validate forms using back end logic

[![Latest Version on NPM](https://img.shields.io/npm/v/form-backend-validation.svg?style=flat-square)](https://npmjs.com/package/form-backend-validation)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie/form-backend-validation/master.svg?style=flat-square)](https://travis-ci.org/spatie/form-backend-validation)
[![npm](https://img.shields.io/npm/dt/form-backend-validation.svg?style=flat-square)](https://npmjs.com/package/form-backend-validation)

Wouldn't it be great if you could just use your back end to validate forms on the front end? This package provides a `Form` class that does exactly that. It can post itself to a configured endpoint and manage errors. The class is meant to be used with a Laravel back end.

Take a look at the [usage section](#usage) to view a detailed example on how to use it.

The code of this package is based on the [Object-Oriented Forms lesson](https://laracasts.com/series/learn-vue-2-step-by-step/episodes/19) in the [Vue 2.0 series](https://laracasts.com/series/learn-vue-2-step-by-step/) on [Laracasts](https://laracasts.com/).

## Support us

Learn how to create a package like this one, by watching our premium video course:

[![Laravel Package training](https://spatie.be/github/package-training.jpg)](https://laravelpackage.training)

We invest a lot of resources into creating [best in class open source packages](https://spatie.be/open-source). You can support us by [buying one of our paid products](https://spatie.be/open-source/support-us).

We highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using. You'll find our address on [our contact page](https://spatie.be/about-us). We publish all received postcards on [our virtual postcard wall](https://spatie.be/open-source/postcards).

## Install

You can install the package via yarn (or npm):

```bash
yarn add form-backend-validation
```

By default, this package expects `axios` to be installed (unless you're using your own http library, see the [Options](#options) section for that).

```bash
yarn add axios
```

## Usage

You can find an example implementation with Laravel and Vue in the [spatie/form-backend-validation-example-app repo](https://github.com/spatie/form-backend-validation-example-app).

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

// Returns object with errors for the specified keys in array.
form.errors.any(keys);

// Returns true if there is an error for the given field name or object
form.errors.has(key);

// Returns the first error for the given field name
form.errors.first(key);

// Returns an array with errors for the given field name
form.errors.get(key);

// Shortcut for getting the first error for the given field name
form.getError(key);

// Clear all errors
form.errors.clear();

// Clear the error of the given field name or all errors on the given object
form.errors.clear(key);

// Returns an object containing fields based on the given array of field names
form.only(keys);

// Reset the values of the form to those passed to the constructor
form.reset();

// Set the values which should be used when calling reset()
form.setInitialValues();

// Populate a form after its instantiation, the populated fields will override the initial fields
// Fields not present at instantiation will not be populated
const form = new Form({
    field1: '',
    field2: '',
});

form.populate({
    field1: 'foo',
    field2: 'bar',
});

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

Default: `true`. Set to `false` if you don't want the form to reset to its original values after a succesful submit.

#### `http: Object`

By default this library uses `axios` for http request. If you want, you can roll with your own http library (or your own axios instance).

*Advanced!* Pass a custom http library object. Your http library needs to adhere to the following interface for any http method you're using:

```ts
method(url: string, data: Object): Promise<Response>
```

Supported http methods are `get`, `delete`, `head`, `post`, `put` & `patch`.

If you want to see how the http library is used internally, refer to the `Form` class' `submit` method.

### Working with files

The form handles file inputs too. The data is then sent as `FormData`, which means it's encoded as `multipart/form-data`.

Some frameworks (like Laravel, Symfony) can't handle these incoming requests through other methods than `POST`, so you might need to take measures to work around this limitation. In Laravel or Symfony, that would mean adding a hidden `_method` field to your form containing the desired HTTP verb.

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

## Postcardware

You're free to use this package, but if it makes it to your production environment we highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using.

Our address is: Spatie, Kruikstraat 22, 2018 Antwerp, Belgium.

We publish all received postcards [on our company website](https://spatie.be/en/opensource/postcards).

## Credits

- [Freek Van der Herten](https://github.com/freekmurze)
- [Sebastian De Deyne](https://github.com/sebastiandedeyne)
- [All Contributors](../../contributors)

Initial code of this package was copied from [Jeffrey Way](https://twitter.com/jeffrey_way)'s [Vue-Forms repo](https://github.com/laracasts/Vue-Forms/).

The idea to go about this way of validating forms comes from [Laravel Spark](https://spark.laravel.com/).

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
