import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UniversalService } from 'src/app/services/universal.service';
import { FilterPipe } from 'src/app/shared/tableFilter.pipe';
export interface Teacher {
  id: number;
  name: string;
  address: string;
  age: number;
  number: number;
}
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent {
  searchInput:any;
  p: number = 1;
  data: Teacher[]=[];
  ngOnInit(): void {
    this.observe()
  }
  constructor(private contract: ContractService, private cd:ChangeDetectorRef,
    private router:Router) {
      LoaderService.loader.next(true)
    this.getTeachers()
  }
  async getTeachers() {
    const teachers:any = await this.contract.getTeachers()
    teachers?.map((teacher: any) => {
      this.data.push({
        id:teacher?.id?.toNumber(),
        name:teacher?.name,
        age:teacher?.age?.toNumber(),
        address:teacher?.teacheraddress,
        number:teacher?.number?.toNumber()
      })
    })
    await LoaderService.loader.next(false)
  }
  route(){
    UniversalService.header.next('Add Teacher')
    this.router.navigateByUrl('dashboard/teachers/add-teacher')
  }
  async observe() {
    UniversalService.AddTeachers.subscribe((res: boolean) => {
      if (res) {
        this.data =[]
        this.getTeachers()
      } else {
        return
      }
      this.cd.detectChanges();
    });
  }
}
