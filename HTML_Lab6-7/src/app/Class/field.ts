/** Базовий клас «Поле» */
export class Field {
  /**
   * @param name
   * @param r
   * @param k
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
