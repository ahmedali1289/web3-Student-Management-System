import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract.service';
import { LoaderService } from 'src/app/services/loader.service';
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
  searchInput!:string;
  data: Student[]=[];
  p: number = 1;
  ngOnInit(): void {
    this.observe()
  }
  constructor(private contract: ContractService, private cd:ChangeDetectorRef,
    private router:Router) {
      LoaderService.loader.next(true)
    this.getStudents()
  }
  async getStudents() {
    const students:any = await this.contract.getStudents()
    students?.map((student: any) => {
      this.data.push({
        id:student?.id?.toNumber(),
        name:student?.name,
        age:student?.age?.toNumber(),
        address:student?.studentaddress,
        number:student?.number?.toNumber()
      })
    })
    await LoaderService.loader.next(false)
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
