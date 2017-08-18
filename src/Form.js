import Errors from './Errors';
import { isArray } from './util';

const reservedFieldNames = [
    '__http', '__options', '__validateRequestType', 'clear', 'data', 'delete',
    'errors', 'getError', 'hasError', 'initial', 'onFail', 'onSuccess',
    'patch', 'post', 'processing', 'put', 'reset', 'submit', 'withData',
    'withErrors', 'withOptions',
];

class Form {
    /**
     * Create a new Form instance.
     *
     * @param {object} data
     * @param {object} options
     */
    constructor(data = {}, options = {}) {
        this.processing = false;

        this.withData(data);
        this.withOptions(options);
        this.withErrors({});
    }

    withData(data) {
        if (isArray(data)) {
            data = data.reduce((carry, element) => {
                carry[element] = '';
                return carry;
            }, {});
        }

        this.initial = data;

        for (const field in data) {
            if (reservedFieldNames.indexOf(field) !== -1) {
                throw new Error(`Field name ${field} isn't allowed to be used in a Form instance.`);
            }

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
                    this.onFail(error.response.data);

                    reject(error.response);
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
    onFail(data) {
        this.errors.record(data.errors);
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
     * Get the error message(s) for the given field.
     *
     * @param field
     */
    getError(field) {
        return this.errors.get(field);
    }

    __validateRequestType(requestType) {
        const requestTypes = ['get', 'delete', 'head', 'post', 'put', 'patch'];

        if (requestTypes.indexOf(requestType) === -1) {
            throw new Error(`\`${requestType}\` is not a valid request type, ` +
                `must be one of: \`${requestTypes.join('\`, \`')}\`.`);
        }
    }

    static withData(data) {
        return (new Form()).withData(data);
    }

    static withErrors(errors) {
        return (new Form()).withErrors(errors);
    }

    static withOptions(options) {
        return (new Form()).withOptions(options);
    }
}

export default Form;
