import { Component } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  routeName!:string;
  constructor(private router: Router){
    this.routeName = router.url.split('/')[2].replace(/-/g, ' ')
  }
}
