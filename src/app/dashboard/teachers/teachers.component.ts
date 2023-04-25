import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ContractService } from 'src/app/services/contract.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UniversalService } from 'src/app/services/universal.service';
export interface Teacher {
  id: number;
  name: string;
  address: string;
  age: number;
  number: number;
  email: string;
  password: number;
}
export interface Course {
  id: number;
  name: string;
  fee: number;
}
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent {
  searchInput: any;
  p: number = 1;
  data: Teacher[] = [];
  dbTeacher:any = [];
  selectedCourse!: number;
  selectedTeacher!: number;
  courses:Course[] = [];
  role!:string
  private subscription!: Subscription;
  ngOnInit(): void {
    this.role = localStorage.getItem('role') as string;
    this.observe()
    this.getCourses()

  }
  constructor(private contract: ContractService, private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private router: Router, private http:ApiService) {
    LoaderService.loader.next(true)
    this.getTeachers()
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  async getTeachers() {
    const teachers: any = await this.contract.getTeachers()
    this.subscription = await this.http.getMethod(`http://localhost:3000/api/auth/users/teacher`,true).subscribe(res=>{
         teachers?.map((teacher: any,index:number) => {
            this.data.push({
              id: teacher?.id?.toNumber(),
              name: teacher?.name,
              age: teacher?.age?.toNumber(),
              address: teacher?.teacheraddress,
              number: teacher?.number?.toNumber(),
              email:res?.[index]?.email,
              password: res?.[index]?.password
            })
        })
    },err=>{
      console.log(err);
    })    
    await LoaderService.loader.next(false)
  }
  route() {
    UniversalService.header.next('Add Teacher')
    this.router.navigateByUrl('dashboard/teachers/add-teacher')
  }
  async observe() {
    UniversalService.AddTeachers.subscribe((res: boolean) => {
      if (res) {
        this.data = []
        this.getTeachers()
      } else {
        return
      }
      this.cd.detectChanges();
    });
    UniversalService.AddCourse.subscribe((res: boolean) => {
      if (res) {
        this.getCourses()
      } else {
        return
      }
      this.cd.detectChanges();
    });
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then();
  }
  async getCourses() {
    const courses = await this.contract.getCourses()
    courses?.map((course: any) => {
      this.courses.push({
        id: course[0].toNumber(),
        name: course[1],
        fee: course.fee.toNumber(),
      })
    })
    await LoaderService.loader.next(false)
  }
  courseAssign() {
    if(this.selectedCourse){
      this.contract.assignCourseTeacher(this.selectedCourse,this.selectedTeacher)
    }
  }
}
