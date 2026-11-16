import { RandomInt } from './random-int';

export interface FoundItem {
  value: number;
  row: number;
  col: number;
}

export class ArrayTwo {
  data: number[][] = [];

  constructor(
    public readonly rows: number = 5,
    public readonly cols: number = 3,
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
    this.data = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => RandomInt.next(from, to))
    );
  }

  setData(matrix: number[][]): void {
    if (matrix.length !== this.rows || matrix.some(r => r.length !== this.cols)) {
      throw new Error(`Розмір масиву має бути ${this.rows}×${this.cols}.`);
    }
    if (!matrix.every(r => r.every(v => this.isValid(v)))) {
      throw new Error(`Усі елементи мають бути цілими числами в діапазоні [${this.min}, ${this.max}].`);
    }
    this.data = matrix.map(r => [...r]);
  }

  findMultiples(divisor: number = 5): FoundItem[] {
    const result: FoundItem[] = [];
    this.data.forEach((row, i) =>
      row.forEach((value, j) => {
        if (value % divisor === 0) {
          result.push({ value, row: i + 1, col: j + 1 });
        }
      })
    );
    return result;
  }
}
