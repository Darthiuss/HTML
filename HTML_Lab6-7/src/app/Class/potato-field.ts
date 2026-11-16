import { Field } from './field';

/** Нащадок «Картопляне поле» */
export class PotatoField extends Field {
  /**
   * @param name
   * @param r
   * @param k
   * @param S
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
