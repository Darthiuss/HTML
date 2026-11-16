import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const LIMIT_MIN = -100;
export const LIMIT_MAX = 100;

export function integerInRange(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const v = control.value;
    if (v === null || v === '') return null;
    const n = Number(v);
    if (!Number.isInteger(n)) return { integer: true };
    if (n < min || n > max) return { range: { min, max } };
    return null;
  };
}

export function rangeOrder(group: AbstractControl): ValidationErrors | null {
  const from = group.get('from')?.value;
  const to = group.get('to')?.value;
  if (from === null || to === null || from === '' || to === '') return null;
  return Number(from) > Number(to) ? { order: true } : null;
}

export function blockNonIntegerKeys(event: KeyboardEvent): void {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (['e', 'E', '+', '.', ','].includes(event.key)) {
    event.preventDefault();
  }
}

export function elementError(control: AbstractControl): string {
  if (control.hasError('required')) return 'Введіть ціле число.';
  if (control.hasError('integer')) return 'Значення має бути цілим числом.';
  if (control.hasError('range')) {
    const r = control.getError('range') as { min: number; max: number };
    return `Значення має бути в діапазоні [${r.min}, ${r.max}].`;
  }
  return '';
}
