import { ChangeDetectorRef, Component } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
import { UniversalService } from 'src/app/services/universal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  routeName!:string;
  ngOnInit(): void {
    this.observe()
  }
  constructor(private router: Router, private cd:ChangeDetectorRef){
    this.routeName = router?.url?.split('/')?.[router?.url?.split('/')?.length - 1]?.replace(/-/g, ' ')
  }
  async observe() {
    UniversalService.header.subscribe((res: string) => {
      console.log(res);
      if (res) {
        this.routeName = res;
      }
      console.log(this.routeName);
      this.cd.detectChanges();
    });
  }
}
