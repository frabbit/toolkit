import { resolveNodeBySelector } from './resolveNodeBySelector';

const exampleObject = {
  name: 'test',
  items: {
    a: 'a item',
    b: {
      name: 'b item'
    }
  }
};

test('resolve by object', async () => {
  expect(await resolveNodeBySelector('name', exampleObject)).toBe('test');
  expect(await resolveNodeBySelector('items.a', exampleObject)).toBe('a item');
  expect(await resolveNodeBySelector('items.b.name', exampleObject)).toBe('b item');
});

test('cannot resolve by object', async () => {
  expect.assertions(1);
  try {
    await resolveNodeBySelector('items.b.unknow.name', exampleObject);
  } catch (e) {
    expect(e.toString()).toMatch(/TypeError/);
  }

});
