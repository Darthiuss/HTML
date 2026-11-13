import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FieldComponent } from './field/field.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FieldComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'laba9_10';
}
