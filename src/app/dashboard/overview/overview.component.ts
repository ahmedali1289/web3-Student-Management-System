import { ChangeDetectorRef, Component } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';
import { UniversalService } from 'src/app/services/universal.service';
export interface Course {
  id: number;
  name: string;
  fee: number;
}
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  coursesLength!:string;
  constructor(private contract: ContractService, private cd: ChangeDetectorRef) {
    this.contract.connectWallet()
  }
  ngOnInit(): void {
    this.getCourses()
    this.observe()
  }
  async getCourses() {
    const courses = await this.contract.getCourses()
    this.coursesLength = JSON.stringify(courses?.length)
  }
  async observe() {
    UniversalService.AddCourse.subscribe((res: boolean) => {
      if (res) {
        this.getCourses()
      } else {
        return
      }
      this.cd.detectChanges();
    });
  }
}
