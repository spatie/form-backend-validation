# Changelog

All notable changes to `form-backend-validation` will be documented in this file

## 1.5.1 - 2017-06-17
- Added: Can now import `Errors` directly as a separate module
- Added: `Errors` can now accept an object of errors.

## 1.5.0 - 2017-05-19
- Added: `options` parameter to `Form`. Currently accepts a `resetOnSuccess` option

## 1.4.1 - 2017-04-26
- Changed: Axios is now a peer dependency to avoid multiple installed versions. Add axios to your project with `npm install axios --save` or `yarn add axios`.

## 1.4.0 - 2017-03-12
- Added: Support for errors that are returned as string

## 1.3.0 - 2017-03-09
- Added: `errors.has` and `errors.clear`

## 1.2.0 - 2017-01-31
- Added: Processing property

## 1.1.1 - 2017-01-30
- Added: Clear all errors when submitting the form

## 1.1.0 - 2017-01-18
- Added: `clear` method on `Form`
- Fixed: Make `reset` method on `Form` respect default values

## 1.0.0 - 2017-01-16
- Initial release
