import { Component } from '@angular/core';

@Component({
  selector: 'app-greet',
  templateUrl: './greet.component.html',
  styleUrls: ['./greet.component.scss']
})
export class GreetComponent {
  greeting!:string;
  constructor() {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      this.greeting = 'Good morning!';
    } else if (currentHour < 18) {
      this.greeting = 'Good afternoon!';
    } else {
      this.greeting = 'Good evening!';
    }
  }
}
