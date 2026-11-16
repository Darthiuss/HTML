import { RandomInt } from './random-int';

export class ArrayOne {
  elements: number[] = [];

  /**
   * @param size
   * @param min
   * @param max
   */
  constructor(
    public readonly size: number = 7,
    public readonly min: number = -100,
    public readonly max: number = 100
  ) {}

  isValid(value: number): boolean {
    return Number.isInteger(value) && value >= this.min && value <= this.max;
  }

  fillRandom(from: number = this.min, to: number = this.max): void {
    if (!this.isValid(from) || !this.isValid(to)) {
      throw new Error(`Межі генерації мають бути цілими в діапазоні [${this.min}, ${this.max}].`);
    }
    this.elements = Array.from({ length: this.size }, () => RandomInt.next(from, to));
  }

  setElements(values: number[]): void {
    if (values.length !== this.size) {
      throw new Error(`Масив має містити рівно ${this.size} елементів.`);
    }
    if (!values.every(v => this.isValid(v))) {
      throw new Error(`Усі елементи мають бути цілими числами в діапазоні [${this.min}, ${this.max}].`);
    }
    this.elements = [...values];
  }

  doubleAll(): void {
    this.elements = this.elements.map(v => v * 2);
  }

  toString(): string {
    return this.elements.join(', ');
  }
}
