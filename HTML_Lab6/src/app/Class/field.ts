/** Базовий клас «Поле» */
export class Field {
  /**
   * @param name назва поля
   * @param r вага посіяних насіння на одиницю площі (кг/м²)
   * @param k коефіцієнт
   */
  constructor(
    public name: string,
    public r: number,
    public k: number
  ) {}

  get typeName(): string {
    return 'Поле';
  }

  yieldPerUnit(): number {
    return this.k * this.r;
  }

  calcYield(): number {
    return this.yieldPerUnit();
  }
}
