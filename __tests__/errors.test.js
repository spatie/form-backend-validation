import { assert } from 'chai';
import Errors from '../src/Errors';

let errors;

describe('Errors', () => {

    beforeEach(() => {
        errors = new Errors();
    });


    it('can determine if there are any errors', () => {
        assert.isFalse(errors.any());

        errors.record({'first_name': 'Value is required'})

        assert.isTrue(errors.any());
    });
});