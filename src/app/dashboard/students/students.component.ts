import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract.service';
import { UniversalService } from 'src/app/services/universal.service';
export interface Student {
  id: number;
  name: string;
  address: string;
  age: number;
  number: number;
}
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  data: Student[]=[];
  ngOnInit(): void {
    this.observe()
  }
  constructor(private contract: ContractService, private cd:ChangeDetectorRef,
    private router:Router) {
    this.getStudents()
  }
  async getStudents() {
    const students:any = await this.contract.getStudents()
    students?.map((course: any) => {
      // this.data.push({
      //   id: course[0].toNumber(),
      //   name: course[1],
      //   fee: course.fee.toNumber(),
      // })
    })

  }
  route(){
    UniversalService.header.next('Add Student')
    this.router.navigateByUrl('dashboard/students/add-student')
  }
  async observe() {
    UniversalService.AddStudent.subscribe((res: boolean) => {
      if (res) {
        this.data =[]
        this.getStudents()
      } else {
        return
      }
      this.cd.detectChanges();
    });
  }
}
