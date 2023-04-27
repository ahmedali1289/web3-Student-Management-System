import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ContractService } from 'src/app/services/contract.service';
import { HelperService } from 'src/app/services/helper.service';
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
export interface AssignedCourse {
  id: number;
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
  originalCourses:Course[] = [];
  assignedCourses:AssignedCourse[] = [];
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
    private helper:HelperService,
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
    try {
      // Make both calls in parallel using Promise.all()
      const [students, res] = await Promise.all([
        this.contract.getStudents(),
        this.http.getMethod('http://localhost:3000/api/auth/users/student', true).toPromise()
      ]);
      
      // Create a new array using map()
      const data = students?.map((student: any, index: number) => {
        const { id, name, age, studentaddress, number } = student;
        const { email, password } = res?.[index] ?? {};
        return {
          id: id?.toNumber(),
          name,
          age: age?.toNumber(),
          address: studentaddress,
          number: number?.toNumber(),
          email,
          password
        };
      }) ?? [];
      
      // Update the data property with the new array
      this.data = data;
    } catch (error) {
      console.error(error);
    } finally {
      await LoaderService.loader.next(false);
    }
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
    try {
      const courses = await this.contract.getCourses();
  
      const newCourses = courses?.map((course: any) => {
        const [id, name, fee] = course;
        return {
          id: id?.toNumber(),
          name,
          fee: fee?.toNumber(),
        };
      }) ?? [];
  
      this.courses = newCourses;
      this.originalCourses = newCourses;
  
    } catch (error) {
      console.error(error);
    } finally {
      await LoaderService.loader.next(false);
    }
  }
  async getAssignedCourses(id: number) {
    try {
      this.courses = this.originalCourses;
      this.assignedCourses = [];
      const courses = await this.contract.getStudentAssignedCourses(id);
  
      const newAssignedCourses = courses?.map((course: any) => {
        return { id: course?.toNumber() };
      }) ?? [];
  
      this.assignedCourses = newAssignedCourses;
      this.courses = this.courses?.filter((course) => {
        return !newAssignedCourses?.some((assignedCourse:AssignedCourse) => {
          return course.id === assignedCourse.id;
        });
      });
  
    } catch (error) {
      console.error(error);
    } finally {
      await LoaderService.loader.next(false);
    }
  }
  
  async courseAssign() {
    if (this.selectedCourse) {
      this.contract.assignCourseStudent(this.selectedStudent, this.selectedCourse);
    }
    this.selectedCourse = -1;
    this.courses = this.originalCourses;
  }
}
