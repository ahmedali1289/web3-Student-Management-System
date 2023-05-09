import { ChangeDetectorRef, Component } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';
import { LoaderService } from 'src/app/services/loader.service';
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
  studentsLength!:string;
  teachersLength!:string;
  accountBalance!:string;
  constructor(private contract: ContractService, private cd: ChangeDetectorRef) {
    this.contract.connectWallet()
  }
  ngOnInit(): void {
    LoaderService.loader.next(true)
    this.getCourses()
    this.getStudents()
    this.getTeachers()
    this.getBalalnce()
    this.observe()
  }
  async getCourses() {
    const courses = await this.contract.getCourses()
    this.coursesLength = JSON.stringify(courses?.length)
  }
  async getStudents() {
    const students = await this.contract.getStudents()
    this.studentsLength = JSON.stringify(students?.length)
  }
  async getBalalnce() {
    const balance = await this.contract.getContractBalance()
    this.accountBalance = balance.toNumber();    
  }
  async getTeachers() {
    const teachers = await this.contract.getTeachers()
    this.teachersLength = JSON.stringify(teachers?.length)
    LoaderService.loader.next(false)
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
    UniversalService.AddStudent.subscribe((res: boolean) => {
      if (res) {
        this.getStudents()
      } else {
        return
      }
      this.cd.detectChanges();
    });
    UniversalService.AddTeachers.subscribe((res: boolean) => {
      if (res) {
        this.getTeachers()
      } else {
        return
      }
      this.cd.detectChanges();
    });
  }
}
