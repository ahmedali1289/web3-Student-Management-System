import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from "@angular/core";
import { UniversalService } from "src/app/services/universal.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent {
  public sidebar!:any
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
  ngOnInit(){
    this.observe()
    if(localStorage.getItem('routes')){
      const route:any = localStorage.getItem('routes')
      this.sidebar = JSON.parse(route)
    }
  }
  constructor(private cd:ChangeDetectorRef){}
  header(item:string){    
    UniversalService.header.next(item)
  }
  async observe() {
    UniversalService.sidebar.subscribe((res: boolean) => {
      if (res) {
        this.sidebar = true;
      } else {
        this.sidebar = false;
      }
      this.cd.detectChanges();
    });
  }
}
