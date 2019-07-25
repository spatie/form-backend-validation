import axios from 'axios';
import Form from '../src/Form';
import MockAdapter from 'axios-mock-adapter';
import { reservedFieldNames } from '../src/util';

let form;
let mockAdapter;

describe('Form', () => {
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

    it("can't be initialized with a reserved field name", () => {
        reservedFieldNames.forEach(fieldName => {
            expect(() => new Form({ [fieldName]: 'foo' })).toThrow();
        });
    });

    it('can be populated with an object', () => {
        form = new Form({ field: '' });

        form.populate({ field: 'foo' });

        expect(form.field).toBe('foo');
    });

    it("can't be populated with fields not present during instantiation", () => {
        form = new Form({ field: '' });

        form.populate({ field: 'foo', anotherField: 'baz' });

        expect(form.anotherField).toBe(undefined);
    });

    it("can't be populated with a reserved field name", () => {
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
        form = Form.create({ field1: '', field2: '' }).withErrors({
            field1: [],
            field2: ['Field 2 is required', 'Field 2 must be an e-mail'],
        });

        expect(form.getError('field1')).toEqual(undefined);
        expect(form.getErrors('field1')).toEqual([]);

        expect(form.getError('field2')).toEqual('Field 2 is required');
        expect(form.getErrors('field2')).toEqual([
            'Field 2 is required',
            'Field 2 must be an e-mail',
        ]);
    });

    it('can accept a custom http instance in options', () => {
        const http = axios.create({ baseURL: 'http://anotherexample.com' });

        form = new Form({}, { http });

        expect(form.__http.defaults.baseURL).toBe('http://anotherexample.com');

        form = new Form({});

        expect(form.__http.defaults.baseURL).toBe(undefined);
    });

    it('can override onSuccess and onFail methods by passing it in options', () => {
        form = new Form({}, { onSuccess: () => 'foo', onFail: () => 'bar' });

        expect(form.onSuccess()).toBe('foo');
        expect(form.onFail()).toBe('bar');
    });

    it('can call directly HTTP verbs to submit', () => {
        form.submit = (...args) => args;

        expect(form.post('url')).toEqual(['post', 'url']);
        expect(form.put('url')).toEqual(['put', 'url']);
        expect(form.patch('url')).toEqual(['patch', 'url']);
        expect(form.delete('url')).toEqual(['delete', 'url']);
    });

    it('transforms the data to a FormData object if there is a File', async () => {
        const file = new File(['hello world!'], 'myfile');

        form.field1 = {
            foo: 'testFoo',
            bar: ['testBar1', 'testBar2'],
            baz: new Date(Date.UTC(2012, 3, 13, 2, 12)),
        };
        form.field2 = file;

        mockAdapter.onPost('http://example.com/posts').reply(request => {
            expect(request.data).toBeInstanceOf(FormData);
            expect(request.data.get('field1[foo]')).toBe('testFoo');
            expect(request.data.get('field1[bar][0]')).toBe('testBar1');
            expect(request.data.get('field1[bar][1]')).toBe('testBar2');
            expect(request.data.get('field1[baz]')).toBe('2012-04-13T02:12:00.000Z');
            expect(request.data.get('field2')).toEqual(file);

            expect(getFormDataKeys(request.data)).toEqual([
                'field1[foo]',
                'field1[bar][0]',
                'field1[bar][1]',
                'field1[baz]',
                'field2',
            ]);
            return [200, {}];
        });

        await form.submit('post', 'http://example.com/posts');
    });

    it('transforms the data to a FormData object if there is a multiple input File', async () => {
        const file1 = new File(['hello world!'], 'myfile1');
        const file2 = new File(['hello world!'], 'myfile2');

        form.field1 = [file1, file2];
        form.field1.__proto__ = Object.create(FileList.prototype);

        mockAdapter.onPost('http://example.com/posts').reply(request => {
            expect(request.data).toBeInstanceOf(FormData);
            expect(request.data.get('field1[0]')).toEqual(file1);
            expect(request.data.get('field1[1]')).toEqual(file2);
            expect(request.data.get('field2')).toBe('value 2');

            expect(getFormDataKeys(request.data)).toEqual([
                'field1[0]',
                'field1[1]',
                'field2',
            ]);
            return [200, {}];
        });

        await form.submit('post', 'http://example.com/posts');
    });

    it('transforms the boolean values in FormData object to "1" or "0"', async () => {
        const file = new File(['hello world!'], 'myfile');

        form.field1 = {
            foo: true,
            bar: false
        };
        form.field2 = file;

        mockAdapter.onPost('http://example.com/posts').reply(request => {
            expect(request.data).toBeInstanceOf(FormData);
                expect(request.data.get('field1[foo]')).toBe('1');
            expect(request.data.get('field1[bar]')).toBe('0');
            expect(request.data.get('field2')).toEqual(file);

            expect(getFormDataKeys(request.data)).toEqual([
                'field1[foo]',
                'field1[bar]',
                'field2',
            ]);
            return [200, {}];
        });

        await form.submit('post', 'http://example.com/posts');
    });
});

function getFormDataKeys(formData) {
    // This is because the FormData.keys() is missing from the jsdom implementations.
    return formData[Object.getOwnPropertySymbols(formData)[0]]._entries.map(e => e.name);
}
