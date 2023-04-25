import { ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web3';
  show:boolean = false;
  constructor(private cd:ChangeDetectorRef){}
  ngOnInit(): void {
    this.observe()    
  }
  async observe(){
    LoaderService.loader.subscribe((res:any)=>{
      this.show = res;
      this.cd.detectChanges();
    })
  }

}
