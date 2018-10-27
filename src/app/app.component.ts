import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hello';

  changeTitle() {
    this.title = 'Hello World';
  }

  changeTitle2(event) {
    this.title = event;
  }

}
