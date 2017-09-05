# Changelog

All notable changes to `form-backend-validation` will be documented in this file

## 2.0.1 - 2017-09-05
- Fixed: Errors for an array of fields are now passed to the Form errors

## 2.0.0 - 2017-08-30
- Added: Static `create` method, and fluent `withData`, `withOptions`, `withErrors` methods
- Added: `onSuccess` and `onFail` can now be set by passing them as an option to the form
- Changed: `Errors.get` has been renamed to `Errors.first`, `get` now returns all of a field's errors
- Changed: `Form.getError` is equivalent to `Errors.first`, `Form.getErrors` to `Errors.get`
- Changed: Responses must follow Laravel 5.5's error response format (see https://laravel.com/docs/5.5/upgrade)
- Changed: `onFail` and `catch` on request promises now return a full error object instead of the response data

## 1.8.0 - 2017-08-23
- Added: `setInitialValues`


## 1.7.0 - 2017-08-16
- Added: You can now use your own http library by passing an `http` option
- Changed: Axios is now an optional dependency

## 1.6.0 - 2017-07-18
- Added: `getError` method on `Form`

## 1.5.1 - 2017-07-17
- Added: Can now import `Errors` directly as a separate module
- Added: `Errors` can now accept an object of errors

## 1.5.0 - 2017-05-19
- Added: `options` parameter to `Form`. Currently accepts a `resetOnSuccess` option

## 1.4.1 - 2017-04-26
- Changed: Axios is now a peer dependency to avoid multiple installed versions. Add axios to your project with `npm install axios --save` or `yarn add axios`

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
