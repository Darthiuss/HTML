import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  links = [
    { path: '/fields', title: 'Лаб. №6: Поля та врожай' },
    { path: '/array-one', title: 'Лаб. №7: Одновимірний масив' },
    { path: '/array-two', title: 'Лаб. №7: Двовимірний масив' }
  ];
}
