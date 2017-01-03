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
});
