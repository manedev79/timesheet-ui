import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent {

  constructor(private route: ActivatedRoute) {
    console.log('route', route);

    this.route.data.subscribe(
      (data2) => console.log('data2', data2)
    );
  }

}
