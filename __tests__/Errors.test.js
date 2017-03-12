import { assert } from 'chai';
import Errors from '../src/Errors';

let errors;

describe('Errors', () => {

    beforeEach(() => {
        errors = new Errors();
    });

    it('can determine if there are any errors', () => {
        assert.isFalse(errors.any());

        errors.record({ 'first_name': ['Value is required'] });

        assert.isTrue(errors.any());
    });

    it('can determine if a given field or object has any errors', () => {
        assert.isFalse(errors.any());

        errors.record({
            'first_name': ['Value is required'],
            'person.0.first_name': ['Value is required'],
        });
        
        assert.isFalse(errors.has('first'));
        assert.isTrue(errors.has('first_name'));
        assert.isTrue(errors.has('person'));
    });

    it('can get all errors', () => {
        const allErrors = { 'first_name': ['Value is required'] };

        errors.record(allErrors);

        assert.equal(allErrors, errors.all());
    });

    it('can get a specific error', () => {
        assert.isFalse(errors.any());

        errors.record({ 'first_name': ['Value is required'] });

        assert.equal('Value is required', errors.get('first_name'));

        assert.isUndefined(errors.get('last_name'));
    });

    it('can clear all the errors', () => {
        errors.record({
            'first_name': ['Value is required'],
            'last_name': ['Value is required'],
        });

        assert.isTrue(errors.any());

        errors.clear();

        assert.isFalse(errors.any());
    });

    it('can clear a specific error', () => {
        errors.record({
            'first_name': ['Value is required'],
            'last_name': ['Value is required'],
        });

        errors.clear('first_name');

        assert.isFalse(errors.has('first_name'));
        assert.isTrue(errors.has('last_name'));
    });

    it('can clear all errors of a given object', () => {
        errors.record({
            'person.first_name': ['Value is required'],
            'person.last_name': ['Value is required'],
            'dates.0.start_date': ['Value is required'],
            'dates.1.start_date': ['Value is required'],
        });

        errors.clear('person');
        errors.clear('dates.0');

        assert.isFalse(errors.has('person'));
        assert.isFalse(errors.has('person.first_name'));
        assert.isFalse(errors.has('person.last_name'));

        assert.isTrue(errors.has('dates'));
        assert.isFalse(errors.has('dates.0.start_date'));
        assert.isTrue(errors.has('dates.1.start_date'));
    });

    it('can handle errors that returned as string', () => {
        errors.record({
            'person.first_name': 'Value is required',
        });

        assert.isTrue(errors.has('person.first_name'));
        assert.equal('Value is required', errors.get('person.first_name'));
    });
});
