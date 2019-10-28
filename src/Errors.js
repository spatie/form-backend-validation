class Errors {
    /**
     * Create a new Errors instance.
     */
    constructor(errors = {}) {
        this.record(errors);
    }

    /**
     * Get all the errors.
     *
     * @return {object}
     */
    all() {
        return this;
    }

    /**
     * Determine if any errors exists for the given field or object.
     *
     * @param {string} field
     */
    has(field) {
        let hasError = this.hasOwnProperty(field);

        if (!hasError) {
            const errors = Object.keys(this).filter(
                e => e.startsWith(`${field}.`) || e.startsWith(`${field}[`)
            );

            hasError = errors.length > 0;
        }

        return hasError;
    }

    first(field) {
        if (this.has(field))
            return this[field][0];
        else
            return undefined;
    }

    get(field) {
        return this[field] || [];
    }

    /**
     * Determine if we have any errors.
     */
    any() {
        return Object.keys(this).length > 0;
    }

    /**
     * Record the new errors.
     *
     * @param {object} errors
     */
    record(errors = {}) {
        for (let error in errors) {
            this[error] = errors[error];
        }
    }

    /**
     * Clear a specific field, object or all error fields.
     *
     * @param {string|null} field
     */
    clear(field) {
        console.log('field',field);
        if (!field) {
            var props = Object.keys(this);
            for (var i = props.length - 1; i > -1; i--) {
                delete this[props[i]];
            }

            return;
        }

        Object.keys(this)
            .filter(e => e === field || e.startsWith(`${field}.`) || e.startsWith(`${field}[`))
            .forEach(e => delete this[e]);
    }
}

export default Errors;
