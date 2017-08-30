import Errors from './Errors';
import { guardAgainstReservedFieldName, isArray } from './util';

class Form {
    /**
     * Create a new Form instance.
     *
     * @param {object} data
     * @param {object} options
     */
    constructor(data = {}, options = {}) {
        this.processing = false;

        this.withData(data)
            .withOptions(options)
            .withErrors({});
    }

    withData(data) {
        if (isArray(data)) {
            data = data.reduce((carry, element) => {
                carry[element] = '';
                return carry;
            }, {});
        }

        this.initial = data;

        this.errors = new Errors();
        this.processing = false;

        for (const field in data) {
            guardAgainstReservedFieldName(field);

            this[field] = data[field];
        }

        return this;
    }

    withErrors(errors) {
        this.errors = new Errors(errors);

        return this;
    }

    withOptions(options) {
        this.__options = {
            resetOnSuccess: true,
        };

        if (options.hasOwnProperty('resetOnSuccess')) {
            this.__options.resetOnSuccess = options.resetOnSuccess;
        }

        if (options.hasOwnProperty('onSuccess')) {
            this.onSuccess = options.onSuccess;
        }

        if (options.hasOwnProperty('onFail')) {
            this.onFail = options.onFail;
        }

        this.__http = options.http || require('axios');

        if (! this.__http) {
            throw new Error('No http library provided. Either pass an http option, or install axios.');
        }

        return this;
    }

    /**
     * Fetch all relevant data for the form.
     */
    data() {
        const data = {};

        for (const property in this.initial) {
            data[property] = this[property];
        }

        return data;
    }

    /**
     * Reset the form fields.
     */
    reset() {
        for (const field in this.initial) {
            this[field] = this.initial[field];
        }

        this.errors.clear();
    }

    setInitialValues(values) {
        for (const property in values) {
            this.initial[property] = values[property];
        }
    }

    /**
     * Clear the form fields.
     */
    clear() {
        for (const field in this.initial) {
            this[field] = '';
        }

        this.errors.clear();
    }

    /**
     * Send a POST request to the given URL.
     *
     * @param {string} url
     */
    post(url) {
        return this.submit('post', url);
    }

    /**
     * Send a PUT request to the given URL.
     *
     * @param {string} url
     */
    put(url) {
        return this.submit('put', url);
    }

    /**
     * Send a PATCH request to the given URL.
     *
     * @param {string} url
     */
    patch(url) {
        return this.submit('patch', url);
    }

    /**
     * Send a DELETE request to the given URL.
     *
     * @param {string} url
     */
    delete(url) {
        return this.submit('delete', url);
    }

    /**
     * Submit the form.
     *
     * @param {string} requestType
     * @param {string} url
     */
    submit(requestType, url) {
        this.__validateRequestType(requestType);
        this.errors.clear();
        this.processing = true;

        return new Promise((resolve, reject) => {
            this.__http[requestType](url, this.data())
                .then((response) => {
                    this.processing = false;
                    this.onSuccess(response.data);

                    resolve(response.data);
                })
                .catch((error) => {
                    this.processing = false;
                    this.onFail(error);

                    reject(error);
                });
        });
    }

    /**
     * Handle a successful form submission.
     *
     * @param {object} data
     */
    onSuccess(data) {
        if (this.__options.resetOnSuccess) {
            this.reset();
        }
    }

    /**
     * Handle a failed form submission.
     *
     * @param {object} data
     */
    onFail(error) {
        if (error.response && error.response.data.errors) {
            this.errors.record(error.response.data.errors);
        }
    }

    /**
     * Get the error message(s) for the given field.
     *
     * @param field
     */
    hasError(field) {
        return this.errors.has(field);
    }

    /**
     * Get the first error message for the given field.
     *
     * @param {string} field
     * @return {string}
     */
    getError(field) {
        return this.errors.first(field);
    }

    /**
     * Get the error messages for the given field.
     *
     * @param {string} field
     * @return {array}
     */
    getErrors(field) {
        return this.errors.get(field);
    }

    __validateRequestType(requestType) {
        const requestTypes = ['get', 'delete', 'head', 'post', 'put', 'patch'];

        if (requestTypes.indexOf(requestType) === -1) {
            throw new Error(`\`${requestType}\` is not a valid request type, ` +
                `must be one of: \`${requestTypes.join('\`, \`')}\`.`);
        }
    }

    static create(data = {}) {
        return (new Form()).withData(data);
    }
}

export default Form;
