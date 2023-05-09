import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UniversalService } from 'src/app/services/universal.service';
export interface Course {
  id: number;
  name: string;
  fee: number;
}
export interface assignedCourse {
  id: number;
}
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  searchInput!: string;
  p: number = 1;
  courses: Course[] = [];
  assignedCourses: assignedCourse[] = [];
  role!: string;
  fees!: any;
  myData!:any;
  async ngOnInit() {
    this.role = (await localStorage.getItem('role')) as string;
    await this.observe();
    await this.getCourses();
  }
  constructor(
    private contract: ContractService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    LoaderService.loader.next(true);
  }
  async getCourses() {
    try {
      const courses = await this.contract.getCourses();
      if(this.role != 'admin'){
        if (courses) {
          const id = localStorage.getItem('id')
          await this.getAssignedCourses(id);
        }
      }
      const newCourses =
        courses?.map((course: any) => {
          const [id, name, fee] = course;
          return {
            id: id?.toNumber(),
            name,
            fee: fee?.toNumber(),
          };
        }) ?? [];
      this.courses = newCourses;
      if (this.role == 'admin') {
        this.courses = newCourses;
      } else if (this.role == 'student') {
        const matchSubjects: any = this.getMatchingSubjects(
          this.courses,
          this.assignedCourses
          );
          this.courses = matchSubjects;
          if(this.courses?.length){
            await this.getFees(localStorage.getItem('id'))
            await this.getStudent(localStorage.getItem('id'))
          }
      } else {
        const matchSubjects: any = this.getMatchingSubjects(
          this.courses,
          this.assignedCourses
        );
        this.courses = matchSubjects;
      }
    } catch (error) {
      console.error(error);
    } finally {
      await LoaderService.loader.next(false);
    }
  }
  async getAssignedCourses(id: any) {
    try {
      this.assignedCourses = [];
      let courses;
      if (this.role == 'student' || this.role == 'admin') {
        courses = await this.contract.getStudentAssignedCourses(id);
      } else {
        courses = await this.contract.getTeacherAssignedCourses(id);
      }
      const newAssignedCourses =
        courses?.map((course: any) => {
          return { id: course?.toNumber() };
        }) ?? [];
      this.assignedCourses = newAssignedCourses;
    } catch (error) {
      console.error(error);
    } finally {
      await LoaderService.loader.next(false);
    }
  }
  async getFees(id: any) {
    try {
      const fees = await this.contract.getFees(id);
      this.fees = Number(fees)
      console.log(this.fees);

    } catch (error) {
      console.error(error);
    } finally {
      await LoaderService.loader.next(false);
    }
  }
  async getStudent(id:any){
    await this.contract.getStudent(id);
  }
  pay(){
    this.contract.payCoursesFees(localStorage.getItem('id'),this.fees)
  }
  route() {
    UniversalService.header.next('Add Course');
    this.router.navigateByUrl('dashboard/courses/add-course');
  }
  async observe() {
    UniversalService.AddCourse.subscribe((res: boolean) => {
      if (res) {
        this.courses = [];
        this.getCourses();
      } else {
        return;
      }
      this.cd.detectChanges();
    });
  }
  getMatchingSubjects(arr1: any, arr2: any) {
    const matchingSubjects: any = [];
    arr1.forEach((item1: any) => {
      arr2.forEach((item2: any) => {
        if (item1.id === item2.id) {
          matchingSubjects.push(item1);
        }
      });
    });
    return matchingSubjects;
  }
}
