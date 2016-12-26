# An easy way to validate forms using back end logic

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-form-backend-validation.svg?style=flat-square)](https://npmjs.com/package/vue-form-backend-validation)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie/vue-form-backend-validation/master.svg?style=flat-square)](https://travis-ci.org/spatie/vue-form-backend-validation)

Wouldn't it be great if you could just use your back end to validate forms on the front end? This package provides a `Form` class does exactly that. It can post itself to a configured endpoint and manage errors. The class meant to be used in a `Vue` component and works out of the box with a Laravel back end.

Take a look at the [usage section]('#usage') to view a detailed example on how to use it.

The code of this package is based on the [Object-Oriented Forms lesson](https://laracasts.com/series/learn-vue-2-step-by-step/episodes/19) in the [Vue 2.0 series](https://laracasts.com/series/learn-vue-2-step-by-step/) on [Laracasts](https://laracasts.com/).

## Postcardware

You're free to use this package (it's [MIT-licensed](LICENSE.md)), but if it makes it to your production environment we highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using.

Our address is: Spatie, Samberstraat 69D, 2060 Antwerp, Belgium.

The best postcards will get published on the open source page on our website.

## Install

You can install the package via yarn:

```bash
$ yarn add vue-form-backend-validation
```

## Usage

This is an example of a fully configured form that could be built up in a `Blade` view.

```html
<form @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
    <div>
        <label for="name">Name:</label>
        <input type="text" name="name" v-model="form.name"> 
        <span v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
    </div>

    <div>
        <label for="text">Text:</label>
        <input type="text" name="text" v-model="form.text">
       <span v-if="form.errors.has('text')" v-text="form.errors.get('text')"></span>
    </div>

    <div>
        <button :disabled="form.errors.any()">Create news item</button>
    </div>
</form>
```

This is an example of a `Vue` component that uses the provided `Form` class. 

```js
new Vue({
    el: '#app',

    data: {
        form: new Form({
            name: '',
            text: ''
        })
    },

    methods: {
        onSubmit() {
            this.form.submit('post', '/newsItems');
        }
    }
});
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
