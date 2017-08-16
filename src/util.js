export function isArray(object) {
    return Object.prototype.toString.call(object) === '[object Array]';
}
