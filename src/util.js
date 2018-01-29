export function isArray(object) {
    return Object.prototype.toString.call(object) === '[object Array]';
}

export const reservedFieldNames = [
    '__http', '__options', '__validateRequestType', 'clear', 'data', 'delete',
    'errors', 'getError', 'getErrors', 'hasError', 'initial', 'onFail', 'only',
    'onSuccess', 'patch', 'populate', 'post', 'processing', 'successful',
    'put', 'reset', 'submit', 'withData', 'withErrors', 'withOptions',
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

export function objectToFormData(object, formData = new FormData(), parent = null) {
    for (const property in object) {
        _appendToFormData(formData, _getKey(parent, property), object[property]);
    }

    return formData;
}


function _getKey(parent, property) {
    return parent ? parent + '[' + property + ']' : property;
}

function _appendToFormData(formData, key, value) {
    if (value instanceof Date) {
        return formData.append(key, value.toISOString());
    }

    if (value instanceof File) {
        return formData.append(key, value, value.name);
    }

    if (typeof value !== 'object') {
        return formData.append(key, value);
    }

    objectToFormData(value, formData, key);
}
