import { Field } from './field';

/** Нащадок «Картопляне поле» */
export class PotatoField extends Field {
  /**
   * @param name назва поля
   * @param r вага посіяних насіння на одиницю площі (кг/м²)
   * @param k коефіцієнт
   * @param S площа поля (м²)
   */
  constructor(
    name: string,
    r: number,
    k: number,
    public S: number
  ) {
    super(name, r, k);
  }

  override get typeName(): string {
    return 'Картопляне поле';
  }

  override calcYield(): number {
    return super.calcYield() * this.S;
  }
}
