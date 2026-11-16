import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArrayTwo, FoundItem } from '../Class/array-two';
import { LIMIT_MAX, LIMIT_MIN, blockNonIntegerKeys, elementError, integerInRange, rangeOrder } from '../shared/validators';

@Component({
  selector: 'app-array-two',
  imports: [ReactiveFormsModule],
  templateUrl: './array-two.component.html',
  styleUrl: './array-two.component.css'
})
export class ArrayTwoComponent {
  readonly rows = 5;
  readonly cols = 3;
  readonly divisor = 5;
  readonly limitMin = LIMIT_MIN;
  readonly limitMax = LIMIT_MAX;
  readonly blockKeys = blockNonIntegerKeys;
  readonly elementError = elementError;

  private readonly arr = new ArrayTwo(this.rows, this.cols, LIMIT_MIN, LIMIT_MAX);

  found: FoundItem[] | null = null;
  message = '';

  range = new FormGroup(
    {
      from: new FormControl<number | null>(-20, [Validators.required, integerInRange(LIMIT_MIN, LIMIT_MAX)]),
      to: new FormControl<number | null>(20, [Validators.required, integerInRange(LIMIT_MIN, LIMIT_MAX)])
    },
    { validators: rangeOrder }
  );

  grid = new FormArray(
    Array.from({ length: this.rows }, () =>
      new FormArray(
        Array.from({ length: this.cols }, () =>
          new FormControl<number | null>(null, [Validators.required, integerInRange(LIMIT_MIN, LIMIT_MAX)])
        )
      )
    )
  );

  constructor() {
    this.grid.valueChanges.subscribe(() => (this.found = null));
  }

  showError(c: FormControl): boolean {
    return c.invalid && (c.touched || c.dirty);
  }

  isFound(i: number, j: number): boolean {
    return !!this.found?.some(f => f.row === i + 1 && f.col === j + 1);
  }

  generate(): void {
    if (this.range.invalid) {
      this.range.markAllAsTouched();
      return;
    }
    const { from, to } = this.range.getRawValue();
    this.arr.fillRandom(Number(from), Number(to));
    this.grid.setValue(this.arr.data);
    this.grid.markAsPristine();
    this.message = 'Масив згенеровано.';
    this.found = null;
  }

  find(): void {
    if (this.grid.invalid) {
      this.grid.markAllAsTouched();
      this.message = '';
      return;
    }
    this.arr.setData(this.grid.getRawValue().map(row => row.map(Number)));
    this.found = this.arr.findMultiples(this.divisor);
    this.message = '';
  }

  clear(): void {
    this.grid.reset();
    this.message = '';
    this.found = null;
  }
}
