import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ContractService } from 'src/app/services/contract.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UniversalService } from 'src/app/services/universal.service';
export interface Student {
  id: number;
  name: string;
  address: string;
  age: number;
  number: number;
  email:string;
  password: number;
}
export interface Course {
  id: number;
  name: string;
  fee: number;
}
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  private subscription!: Subscription;
  searchInput!:string;
  data: Student[]=[];
  selectedCourse!: number;
  selectedStudent!: number;
  courses:Course[] = [];
  p: number = 1;
  role!:string;
  ngOnInit(): void {
    this.role = localStorage.getItem('role') as string;
    this.observe()
    this.getCourses()
  }
  constructor(private contract: ContractService, private cd:ChangeDetectorRef,
    private http: ApiService,
    private modalService:NgbModal,
    private router:Router) {
      LoaderService.loader.next(true)
    this.getStudents()
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  async getStudents() {
    const students:any = await this.contract.getStudents()
    this.subscription = await this.http.getMethod(`http://localhost:3000/api/auth/users/student`,true).subscribe(res=>{
         students?.map((student: any,index:number) => {
            this.data.push({
              id: student?.id?.toNumber(),
              name: student?.name,
              age: student?.age?.toNumber(),
              address: student?.studentaddress,
              number: student?.number?.toNumber(),
              email:res?.[index]?.email,
              password: res?.[index]?.password
            })
        })
    },err=>{
      console.log(err);
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
      this.contract.assignCourseStudent(this.selectedCourse,this.selectedStudent)
    }
  }
}
