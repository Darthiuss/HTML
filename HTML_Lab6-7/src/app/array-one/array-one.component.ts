import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArrayOne } from '../Class/array-one';
import { LIMIT_MAX, LIMIT_MIN, blockNonIntegerKeys, elementError, integerInRange, rangeOrder } from '../shared/validators';

@Component({
  selector: 'app-array-one',
  imports: [ReactiveFormsModule],
  templateUrl: './array-one.component.html',
  styleUrl: './array-one.component.css'
})
export class ArrayOneComponent {
  readonly size = 7;
  readonly limitMin = LIMIT_MIN;
  readonly limitMax = LIMIT_MAX;
  readonly blockKeys = blockNonIntegerKeys;
  readonly elementError = elementError;

  private readonly arr = new ArrayOne(this.size, LIMIT_MIN, LIMIT_MAX);

  before: number[] | null = null;
  after: number[] | null = null;
  message = '';

  range = new FormGroup(
    {
      from: new FormControl<number | null>(-50, [Validators.required, integerInRange(LIMIT_MIN, LIMIT_MAX)]),
      to: new FormControl<number | null>(50, [Validators.required, integerInRange(LIMIT_MIN, LIMIT_MAX)])
    },
    { validators: rangeOrder }
  );

  items = new FormArray(
    Array.from({ length: this.size }, () =>
      new FormControl<number | null>(null, [Validators.required, integerInRange(LIMIT_MIN, LIMIT_MAX)])
    )
  );

  constructor() {
    this.items.valueChanges.subscribe(() => this.clearResult());
  }

  private clearResult(): void {
    this.before = null;
    this.after = null;
  }

  showError(c: FormControl): boolean {
    return c.invalid && (c.touched || c.dirty);
  }

  generate(): void {
    if (this.range.invalid) {
      this.range.markAllAsTouched();
      return;
    }
    const { from, to } = this.range.getRawValue();
    this.arr.fillRandom(Number(from), Number(to));
    this.items.setValue(this.arr.elements);
    this.items.markAsPristine();
    this.message = 'Масив згенеровано.';
    this.clearResult();
  }

  doubleAll(): void {
    if (this.items.invalid) {
      this.items.markAllAsTouched();
      this.message = '';
      return;
    }
    this.arr.setElements(this.items.getRawValue().map(Number));
    this.before = [...this.arr.elements];
    this.arr.doubleAll();
    this.after = [...this.arr.elements];
    this.message = '';
  }

  clear(): void {
    this.items.reset();
    this.message = '';
    this.clearResult();
  }
}
