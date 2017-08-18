import Errors from './Errors';
import { isArray } from './util';

class Form {
    /**
     * Create a new Form instance.
     *
     * @param {object} data
     * @param {object} options
     */
    constructor(data, options) {
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
            this[field] = data[field];
        }

        this.__options = {
            resetOnSuccess: true,
            ...options,
        };
    }

    get __http() {
        const http = this.__options.http || require('axios');

        if (! http) {
            throw new Error('No http library provided. Either pass an http option, or install axios.');
        }

        return http;
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
        this.validateRequestType(requestType);
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
     * Validate a request type.
     *
     * @param {string} requestType
     */
    validateRequestType(requestType) {
        const requestTypes = ['get', 'delete', 'head', 'post', 'put', 'patch'];

        if (requestTypes.indexOf(requestType) === -1) {
            throw new Error(`\`${requestType}\` is not a valid request type, ` +
                `must be one of: \`${requestTypes.join('\`, \`')}\`.`);
        }
    }

    /**
     * Handle a successful form submission.
     *
     * @param {object} data
     */
    onSuccess() {
        if (this.__options.resetOnSuccess) {
            this.reset();
        }
    }

    /**
     * Handle a failed form submission.
     *
     * @param {object} errors
     */
    onFail(errors) {
        this.errors.record(errors);
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
}

export default Form;
