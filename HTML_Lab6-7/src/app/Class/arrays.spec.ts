import { ArrayOne } from './array-one';
import { ArrayTwo } from './array-two';
import { RandomInt } from './random-int';

describe('RandomInt', () => {
  it('повертає цілі числа в межах діапазону', () => {
    for (let i = 0; i < 200; i++) {
      const v = RandomInt.next(-3, 3);
      expect(Number.isInteger(v) && v >= -3 && v <= 3).toBeTrue();
    }
  });
  it('кидає помилку для некоректного діапазону', () => {
    expect(() => RandomInt.next(5, 1)).toThrow();
    expect(() => RandomInt.next(0.5, 2)).toThrow();
  });
});

describe('ArrayOne', () => {
  it('doubleAll збільшує елементи в 2 рази', () => {
    const a = new ArrayOne(3);
    a.setElements([1, -2, 30]);
    a.doubleAll();
    expect(a.elements).toEqual([2, -4, 60]);
  });
  it('блокує значення поза діапазоном та неправильну кількість', () => {
    const a = new ArrayOne(3);
    expect(() => a.setElements([1, 2, 101])).toThrow();
    expect(() => a.setElements([1, 2])).toThrow();
    expect(() => a.setElements([1, 2.5, 3])).toThrow();
  });
  it('fillRandom створює 7 елементів у межах', () => {
    const a = new ArrayOne();
    a.fillRandom(-5, 5);
    expect(a.elements.length).toBe(7);
    expect(a.elements.every(v => v >= -5 && v <= 5)).toBeTrue();
  });
});

describe('ArrayTwo', () => {
  it('знаходить елементи, кратні 5, з індексами (з 1)', () => {
    const a = new ArrayTwo(2, 2);
    a.setData([[5, 1], [0, -10]]);
    expect(a.findMultiples(5)).toEqual([
      { value: 5, row: 1, col: 1 },
      { value: 0, row: 2, col: 1 },
      { value: -10, row: 2, col: 2 }
    ]);
  });
  it('блокує некоректні розмір і значення', () => {
    const a = new ArrayTwo(2, 2);
    expect(() => a.setData([[1, 2]])).toThrow();
    expect(() => a.setData([[1, 2], [3, 999]])).toThrow();
  });
});
