import { Field } from './field';
import { PotatoField } from './potato-field';

describe('Field classes', () => {
  it('Field: урожай з одиниці площі = k * r', () => {
    const f = new Field('Тест', 2, 3);
    expect(f.yieldPerUnit()).toBe(6);
    expect(f.calcYield()).toBe(6);
  });

  it('PotatoField: урожай з усього поля = k * r * S', () => {
    const p = new PotatoField('Картопля', 2, 3, 100);
    expect(p.yieldPerUnit()).toBe(6);
    expect(p.calcYield()).toBe(600);
  });
});
