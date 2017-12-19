import axios from 'axios';
import Form from '../src/Form';
import MockAdapter from 'axios-mock-adapter';
import { reservedFieldNames } from '../src/util';

let form;
let mockAdapter;

describe('Errors', () => {

    beforeEach(() => {
        form = new Form({
            field1: 'value 1',
            field2: 'value 2',
        });

        mockAdapter = new MockAdapter(axios);
    });

    it('is initializable', () => {
        form = new Form({}, {});
        form = Form.create({});
    });

    it('exposes the passed form field values as properties', () => {
        expect(form.field1).toBe('value 1');
        expect(form.field2).toBe('value 2');
    });

    it('remembers initial values in the `initial` property', () => {
        form.field1 = 'changed';

        expect(form.field1).toBe('changed');
        expect(form.initial.field1).toBe('value 1');
    });

    it('should only return the specified fields', () => {
        const filtered = form.only(['field2']);

        expect(filtered).toEqual({ field2: 'value 2' });
    });

    it('can reset the form values', () => {
        form.field1 = 'changed';
        form.field2 = 'changed';

        form.reset();

        expect(form.field1).toBe('value 1');
        expect(form.field2).toBe('value 2');
    });

    it('can use the current data as the new initial values', () => {
        form.setInitialValues({ field1: 'new initial' });

        form.reset();

        expect(form.field1).toBe('new initial');
    });

    it('uses a copy for initial values to avoid mutation', () => {
        form = new Form({ address: { street: 'Samberstraat' } });

        form.address.street = 'Langestraat';

        expect(form.initial.address.street).toBe('Samberstraat');
    });

    it('resets with a copy for initial values to avoid object mutation', () => {
        form = new Form({ address: { street: 'Samberstraat' } });

        form.address.street = 'Langestraat';

        form.reset();
        expect(form.address.street).toBe('Samberstraat');

        // Assert again to ensure the values in the `reset` aren't mutable

        form.address.street = 'Langestraat';

        form.reset();
        expect(form.address.street).toBe('Samberstraat');
    });

    it('resets with a copy for initial values to avoid array mutation', () => {
        form = new Form({ jobs: ['developer'] });

        form.jobs.push('designer');

        form.reset();
        expect(form.jobs).toEqual(['developer']);

        // Assert again to ensure the values in the `reset` aren't mutable

        form.jobs.push('designer');

        form.reset();
        expect(form.jobs).toEqual(['developer']);
    });

    it('can clear the form values', () => {
        form.clear();

        expect(form.field1).toBe('');
        expect(form.field2).toBe('');
    });

    it('can\'t be initialized with a reserved field name', () => {
        reservedFieldNames.forEach(fieldName => {
            expect(() => new Form({ [fieldName]: 'foo' })).toThrow();
        });
    });

    it('can be populated with an object', () => {
        form = new Form({ field: ''});

        form.populate({field: 'foo'});

        expect(form.field).toBe('foo');
    });

    it('can\'t be populated with fields not present during instantiation', () => {
        form = new Form({ field: ''});

        form.populate({field: 'foo', anotherField: 'baz'});

        expect(form.anotherField).toBe(undefined);
    });

    it('can\'t be populated with a reserved field name', () => {
        reservedFieldNames.forEach(fieldName => {
            expect(() => new Form().populate({ [fieldName]: 'foo' })).toThrow();
        });
    });

    it('will record the errors that the server passes through', async () => {
        mockAdapter.onPost('http://example.com/posts').reply(422, {
            errors: { first_name: ['Value is required'] },
        });

        try {
            await form.submit('post', 'http://example.com/posts');
        } catch (e) {} // eslint-disable-line no-empty

        expect(form.errors.has('first_name')).toBe(true);
    });

    it('can accept an array with form field names', () => {
        form = new Form(['field1', 'field2']);

        expect(form.data()['field1']).toBe('');
        expect(form.data()['field2']).toBe('');
    });

    it('resets the form on success unless the feature is disabled', async () => {
        mockAdapter.onPost('http://example.com/posts').reply(200, {});

        form = new Form({ field: 'value' });

        form.field = 'changed';

        await form.submit('post', 'http://example.com/posts');

        expect(form.field).toBe('value');

        form = new Form({ field: 'value' }, { resetOnSuccess: false });

        form.field = 'changed';

        await form.submit('post', 'http://example.com/posts');

        expect(form.field).toBe('changed');
    });

    it('can see if there is an error for a field', () => {
        expect(form.hasError('field1')).toBe(false);

        form.errors.record({ field1: ['Value is required'] });

        expect(form.hasError('field1')).toBe(true);
    });

    it('can be successfully completed', async () => {
        mockAdapter.onPost('http://example.com/posts').reply(200, {});

        form = new Form();

        await form.submit('post', 'http://example.com/posts');

        expect(form.successful).toBe(true);
    });

    it('can get an error message for a field', () => {
        form = Form.create({ field1: '', field2: '' })
            .withErrors({ field1: [], field2: ['Field 2 is required', 'Field 2 must be an e-mail'] });

        expect(form.getError('field1')).toEqual(undefined);
        expect(form.getErrors('field1')).toEqual([]);

        expect(form.getError('field2')).toEqual('Field 2 is required');
        expect(form.getErrors('field2')).toEqual(['Field 2 is required', 'Field 2 must be an e-mail']);
    });

    it('can accept a custom http instance in options', () => {
        const http = axios.create({ baseURL: 'http://anotherexample.com' });

        mockAdapter = new MockAdapter(http);

        form = new Form({}, { http });

        expect(form.__http.defaults.baseURL).toBe('http://anotherexample.com');

        form = new Form({});

        expect(form.__http.defaults.baseURL).toBe(undefined);
    });
});
