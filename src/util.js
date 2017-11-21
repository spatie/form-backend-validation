export function isArray(object) {
    return Object.prototype.toString.call(object) === '[object Array]';
}

const reservedFieldNames = [
    '__http', '__options', '__validateRequestType', 'clear', 'data', 'delete',
    'errors', 'getError', 'getErrors', 'hasError', 'initial', 'onFail',
    'onSuccess', 'patch', 'post', 'processing', 'successful', 'put', 'reset', 'submit',
    'withData', 'withErrors', 'withOptions',
];

export function guardAgainstReservedFieldName(fieldName) {
    if (reservedFieldNames.indexOf(fieldName) !== -1) {
        throw new Error(`Field name ${fieldName} isn't allowed to be used in a Form or Errors instance.`);
    }
}

export function merge(a, b) {
    for (const key in b) {
        a[key] = cloneDeep(b[key]);
    }
}

export function cloneDeep(object) {
    if (object === null) {
        return null;
    }

    if (Array.isArray(object)) {
        return [...object];
    }

    if (typeof object === 'object') {
        const clone = {};

        for (const key in object) {
            clone[key] = cloneDeep(object[key]);
        }

        return clone;
    }

    return object;
}
