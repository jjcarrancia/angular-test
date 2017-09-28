import '../../style/app.scss';
import { Component } from '@angular/core';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
})
export class AppComponent {
  url = '';
  title: 'Atabix Angular Starter';

  constructor() {}
}
