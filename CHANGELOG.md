# Changelog

All notable changes to `form-backend-validation` will be documented in this file

## 2.4.0 - 2020-06-04

- added `form.errors.any` method

## 2.3.9 - 2019-10-21

- convert `null` values to emptu strings when using FormData

## 2.3.8 - 2019-07-25

- convert boolean values to 1 or 0 when using FormData

## 2.3.7 - 2019-01-10

- fix omitted empty values on submit

## 2.3.6 - 2018-01-03
- Fixed: Build script

## 2.3.5 - 2018-12-26
- Fixed: Better support for arrays of objects

## 2.3.4 - 2018-12-13
- Changed: Checks now for the existence of window before trying to access axios of it

## 2.3.3 - 2018-03-27
- Changed: Updated errors are now mutated instead of reassigned (fixes reactivity caveats)

## 2.3.2 - 2018-03-02
- Fixed: Build script

## 2.3.1 - 2018-02-05
- Fixed: Multi file uploads

## 2.3.0 - 2018-01-29
- Added: Support for file uploads
- Added: Support for array notation in `Errors.clear`

## 2.2.0 - 2018-01-20
- Added: `only` method

## 2.1.0 - 2017-11-21
- Added: `successful` state property
- Added: `populate` method to fill the form with values without overwriting the initial values
- Fixed: A bug that would mutate initial values when using arrays

## 2.0.5 - 2017-11-13
- Fixed: Republished because 2.0.4 changes didn't come through

## 2.0.4 - 2017-11-13
- Changed: Look for `axios` on `window` as the http client

## 2.0.3 - 2017-11-06
- Fixed: Removed unnecessary Vue dependency

## 2.0.2 - 2017-10-19
- Fixed: A bug that would mutate initial values when using nested objects

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
