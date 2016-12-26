import { assert } from 'chai';
import Form from '../src/Form';

let form;

describe('Errors', () => {

    beforeEach(() => {
        form = new Form({
            field1: 'value 1',
            field2: 'value 2',
        });
    });

    it('exposes the passed form field values as properties', () => {
        assert.equal(form.field1, 'value 1');
        assert.equal(form.field2, 'value 2');
    });

    it('can reset the form values', () => {
        form.reset();

        assert.equal(form.field1, '');
        assert.equal(form.field2, '');
    });
});