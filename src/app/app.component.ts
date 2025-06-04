import { Component } from '@angular/core';
import { MainService } from './services/main.services';


@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chatbox';
  constructor(public service: MainService) {

  }
}
