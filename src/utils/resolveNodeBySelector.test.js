import { resolveNodeBySelector } from './resolveNodeBySelector';

test('resolve by object', async () => {
  const exampleObject = {
    name: 'test',
    items: {
      a: 'a item',
      b: {
        name: 'b item'
      }
    }
  };

  expect(await resolveNodeBySelector('name', exampleObject)).toBe('test');
  expect(await resolveNodeBySelector('items.a', exampleObject)).toBe('a item');
  expect(await resolveNodeBySelector('items.b.name', exampleObject)).toBe('b item');
  expect(await resolveNodeBySelector('items.c.unknow.button', exampleObject)).toBe(null);
});
