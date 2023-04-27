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
export interface assignedCourse {
  id: number;
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
  assignedCourses:assignedCourse[] = [];
  originalCourses:Course[] = [];
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
    try {
      // Make both calls in parallel using Promise.all()
      const [teachers, res] = await Promise.all([
        this.contract.getTeachers(),
        this.http.getMethod('http://localhost:3000/api/auth/users/teacher', true).toPromise()
      ]);
      
      // Create a new array using map()
      const data = teachers?.map((teacher: any, index: number) => {
        const { id, name, age, teacheraddress, number } = teacher;
        const { email, password } = res?.[index] ?? {};
        return {
          id: id?.toNumber(),
          name,
          age: age?.toNumber(),
          address: teacheraddress,
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
      const courses = await this.contract.getTeacherAssignedCourses(id);
  
      const newAssignedCourses = courses?.map((course: any) => {
        return { id: course?.toNumber() };
      }) ?? [];
  
      this.assignedCourses = newAssignedCourses;
      this.courses = this.courses?.filter((course) => {
        return !newAssignedCourses?.some((assignedCourse:assignedCourse) => {
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
      this.contract.assignCourseTeacher(this.selectedTeacher, this.selectedCourse);
    }
    this.selectedCourse = -1;
    this.courses = this.originalCourses;
  }
}
