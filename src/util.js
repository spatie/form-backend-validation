export function isArray(object) {
    return Object.prototype.toString.call(object) === '[object Array]';
}

const reservedFieldNames = [
    '__http', '__options', '__validateRequestType', 'clear', 'data', 'delete',
    'errors', 'getError', 'getErrors', 'hasError', 'initial', 'onFail',
    'onSuccess', 'patch', 'post', 'processing', 'put', 'reset', 'submit',
    'withData', 'withErrors', 'withOptions',
];

export function guardAgainstReservedFieldName(fieldName) {
    if (reservedFieldNames.indexOf(fieldName) !== -1) {
        throw new Error(`Field name ${fieldName} isn't allowed to be used in a Form or Errors instance.`);
    }
}
