import Errors from '../src/Errors';

let errors;

describe('Errors', () => {
    beforeEach(() => {
        errors = new Errors();
    });

    it('can determine if there are any errors', () => {
        expect(errors.any()).toBe(false);

        errors.record({ first_name: ['Value is required'] });

        expect(errors.any()).toBe(true);
    });

    it('can determine if there are any errors within an array of field names', () => {
        expect(errors.any(['first_name', 'last_name'])).toBe(false);

        errors.record({ first_name: ['Value is required'] });

        expect(errors.any(['first_name', 'last_name'])).toBe(true);
        expect(errors.any(['last_name', 'person'])).toBe(false);
    });

    it('can determine if a given field or object has any errors', () => {
        expect(errors.any()).toBe(false);

        errors.record({
            first_name: ['Value is required'],
            'person.0.first_name': ['Value is required'],
        });

        expect(errors.has('first')).toBe(false);
        expect(errors.has('first_name')).toBe(true);
        expect(errors.has('person')).toBe(true);
    });

    it('can get all errors', () => {
        const allErrors = { first_name: ['Value is required'] };

        errors.record(allErrors);

        expect(errors.all()).toEqual(allErrors);
    });

    it('can get a specific error', () => {
        expect(errors.any()).toBe(false);

        errors.record({ first_name: ['Value is required'] });

        expect(errors.first('first_name')).toEqual('Value is required');

        expect(errors.first('last_name')).toBeUndefined();
    });

    it('can clear all the errors', () => {
        errors.record({
            first_name: ['Value is required'],
            last_name: ['Value is required'],
        });

        expect(errors.any()).toBe(true);

        errors.clear();

        expect(errors.any()).toBe(false);
    });

    it('can clear a specific error', () => {
        errors.record({
            first_name: ['Value is required'],
            last_name: ['Value is required'],
        });

        errors.clear('first_name');

        expect(errors.has('first_name')).toBe(false);
        expect(errors.has('last_name')).toBe(true);
    });

    it('can clear all errors of a given object', () => {
        errors.record({
            'person.first_name': ['Value is required'],
            'person.last_name': ['Value is required'],
            'dates.0.start_date': ['Value is required'],
            'dates.1.start_date': ['Value is required'],
            'roles[0].name': ['Value is required'],
            'roles[1].name': ['Value is required'],
        });

        errors.clear('person');
        errors.clear('dates.0');
        errors.clear('roles[1]');

        expect(errors.has('person')).toBe(false);
        expect(errors.has('person.first_name')).toBe(false);
        expect(errors.has('person.last_name')).toBe(false);

        expect(errors.has('dates')).toBe(true);
        expect(errors.has('dates.0.start_date')).toBe(false);
        expect(errors.has('dates.1.start_date')).toBe(true);

        expect(errors.has('roles')).toBe(true);
        expect(errors.has('roles[0].name')).toBe(true);
        expect(errors.has('roles[1].name')).toBe(false);
    });

    it('can accept an object of errors in its constructor', () => {
        errors = new Errors({
            first_name: ['Value is required'],
        });

        expect(errors.first('first_name')).toEqual('Value is required');
    });

    it('can assign an empty object in its constructor if no errors are passed', () => {
        errors = new Errors();

        expect(errors.all()).toEqual({});
    });
});
