import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <p-toast></p-toast>
    <p-toast position="top-center" key="tc"></p-toast>
  `,
})
export class AppComponent {
  title = 'Calculadora';
}
