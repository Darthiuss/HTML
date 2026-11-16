/** Клас для генерації випадкових цілих чисел у заданому діапазоні */
export class RandomInt {
  static next(min: number, max: number): number {
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
      throw new Error('Межі діапазону мають бути цілими числами.');
    }
    if (min > max) {
      throw new Error('Мінімум не може бути більшим за максимум.');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
