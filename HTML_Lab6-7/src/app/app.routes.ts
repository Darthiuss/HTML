import { Routes } from '@angular/router';
import { FieldComponent } from './field/field.component';
import { ArrayOneComponent } from './array-one/array-one.component';
import { ArrayTwoComponent } from './array-two/array-two.component';

export const routes: Routes = [
  { path: '', redirectTo: 'fields', pathMatch: 'full' },
  { path: 'fields', component: FieldComponent },        // лабораторна №6
  { path: 'array-one', component: ArrayOneComponent },  // одновимірний масив
  { path: 'array-two', component: ArrayTwoComponent },  // двовимірний масив
  { path: '**', redirectTo: 'fields' }
];
