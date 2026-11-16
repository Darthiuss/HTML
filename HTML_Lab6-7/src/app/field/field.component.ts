import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Field } from '../Class/field';
import { PotatoField } from '../Class/potato-field';

const NAME_PATTERN = /^[A-Za-zА-Яа-яІіЇїЄєҐґ0-9'’.\- ]+$/;

function positiveNumber(control: AbstractControl): ValidationErrors | null {
  const v = control.value;
  if (v === null || v === '') return null; // це перевіряє Validators.required
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? null : { positive: true };
}

function notBlank(control: AbstractControl): ValidationErrors | null {
  const v = control.value;
  return typeof v === 'string' && v.length > 0 && v.trim().length === 0 ? { blank: true } : null;
}

@Component({
  selector: 'app-field',
  imports: [ReactiveFormsModule],
  templateUrl: './field.component.html',
  styleUrl: './field.component.css'
})
export class FieldComponent {
  fields: Field[] = [];

  form = new FormGroup({
    type: new FormControl<'base' | 'potato'>('potato', { nonNullable: true }),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(NAME_PATTERN),
      notBlank
    ]),
    r: new FormControl<number | null>(null, [Validators.required, positiveNumber, Validators.max(1000)]),
    k: new FormControl<number | null>(null, [Validators.required, positiveNumber, Validators.max(1000)]),
    S: new FormControl<number | null>(null, [Validators.required, positiveNumber, Validators.max(1000000000)])
  });

  constructor() {
    this.form.controls.type.valueChanges.subscribe(type => this.updateAreaControl(type));
    this.updateAreaControl(this.form.controls.type.value);
  }

  get isPotato(): boolean {
    return this.form.controls.type.value === 'potato';
  }

  private updateAreaControl(type: 'base' | 'potato'): void {
    const s = this.form.controls.S;
    if (type === 'potato') {
      s.enable();
    } else {
      s.disable();
      s.reset();
    }
  }

  showError(name: 'name' | 'r' | 'k' | 'S', error?: string): boolean {
    const c = this.form.controls[name];
    const touched = c.touched || c.dirty;
    return !!touched && (error ? c.hasError(error) : c.invalid);
  }

  add(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { type, name, r, k, S } = this.form.getRawValue();
    const title = (name ?? '').trim();
    const field =
      type === 'potato'
        ? new PotatoField(title, Number(r), Number(k), Number(S))
        : new Field(title, Number(r), Number(k));
    this.fields.push(field);
    this.form.reset({ type, name: '', r: null, k: null, S: null });
  }

  remove(index: number): void {
    this.fields.splice(index, 1);
  }

  clear(): void {
    this.fields = [];
  }

  isPotatoField(f: Field): f is PotatoField {
    return f instanceof PotatoField;
  }

  areaOf(f: Field): number | null {
    return f instanceof PotatoField ? f.S : null;
  }
}
