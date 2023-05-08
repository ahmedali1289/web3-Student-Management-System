import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { ContractService } from 'src/app/services/contract.service';
import { HelperService } from 'src/app/services/helper.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UniversalService } from 'src/app/services/universal.service';
import { FormComponent } from 'src/app/shared/form/form.component';
export interface Student {
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
export interface AssignedCourse {
  id: number;
}
@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  @ViewChild('marksForm') marksForm!: FormComponent;
  subscription!: Subscription;
  searchInput = '';
  marks!:any;
  data: Student[] = [];
  selectedCourse = -1;
  selectedStudent = -1;
  courses: Course[] = [];
  originalCourses: Course[] = [];
  assignedCourses: AssignedCourse[] = [];
  teacherAssignedCourse:any = [];
  courseIndex!:number;
  p = 1;
  role = localStorage.getItem('role');
  constructor(
    private contract: ContractService,
    private cd: ChangeDetectorRef,
    private http: ApiService,
    private modalService: NgbModal,
    private helper: HelperService,
    private router: Router,
    private toaster:ToastrService
  ) {
    this.getStudents();
  }
  ngOnInit() {
    this.observe();
    this.getCourses().then(() => {
      if (this.role === 'teacher') {
        LoaderService.loader.next(true);
        this.getAssignedCoursesTeacher(localStorage.getItem('id'));
      }
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  async getStudents() {
    try {
      const [students, res] = await Promise.all([
        this.contract.getStudents(),
        this.http
          .getMethod('http://localhost:3000/api/auth/users/student', true)
          .toPromise(),
      ]);
      this.data = students.map((student: any, index: number) => {
        
        const { id, name, age, studentaddress, number, attendance } = student;
        const { email, password } = res?.[index] ?? {};
        return {
          id: id?.toNumber(),
          name,
          age: age?.toNumber(),
          address: studentaddress,
          number: number?.toNumber(),
          attendance:attendance[0].toNumber(),
          email,
          password,
        };
      });
    } catch (error) {
      console.error(error);
    } finally {
      await LoaderService.loader.next(false);
    }
  }
  route() {
    UniversalService.header.next('Add Student');
    this.router.navigateByUrl('dashboard/students/add-student');
  }
  observe() {
    UniversalService.AddStudent.subscribe((res) => {
      if (res) {
        this.data = [];
        this.getStudents();
      } else {
        return;
      }
      this.cd.detectChanges();
    });
    UniversalService.AddCourse.subscribe((res) => {
      if (res) {
        this.getCourses();
      } else {
        return;
      }
      this.cd.detectChanges();
    });
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then();
  }
  async getCourses() {
    try {
      const courses = await this.contract.getCourses();
      this.courses = courses.map((course:any) => {
        const [id, name, fee] = course;
        return {
          id: id?.toNumber(),
          name,
          fee: fee?.toNumber(),
        };
      });
      this.originalCourses = this.courses;
    } catch (error) {
      console.error(error);
    } finally {
      await LoaderService.loader.next(false);
    }
  }
  async getAssignedCourses(id: any) {
    try {
      this.courses = this.originalCourses;
      const courses = await this.contract.getStudentAssignedCourses(id);
      this.assignedCourses = courses.map((course:any) => ({
        id: course?.toNumber(),
      }));
      this.courses = this.courses.filter(
        (course) =>
          !this.assignedCourses.some(
            (assignedCourse) => course.id === assignedCourse.id
          )
      );
    } catch (error) {
      console.error(error);
    } finally {
      await LoaderService.loader.next(false);
    }
  }
  async getAssignedCoursesTeacher(id: any) {
    LoaderService.loader.next(true)
    try {
      const courses = await this.contract.getTeacherAssignedCourses(id);
      const promises = courses.map((course:any) => {this.getStudentsByCourseId(course.toNumber());this.teacherAssignedCourse = course.toNumber()});
      if(this.role == 'teacher' && !courses?.length){
    LoaderService.loader.next(false)
        this.data = []
      }
      await Promise.all(promises);
    } catch (error) {
      await LoaderService.loader.next(false);
      console.error(error);
    } finally {
      await LoaderService.loader.next(false);
    }
  }
  async getStudentsByCourseId(id: any) {
    const students = await this.contract.getStudentsByCourseId(id);
    this.data = this.data?.filter(
      (student: any, index: number) =>
        student?.id === students?.[index]?.toNumber()
    );
    await LoaderService.loader.next(false);
  }

  async courseAssign() {
    if (this.selectedCourse) {
      this.contract.assignCourseStudent(
        this.selectedStudent,
        this.selectedCourse
      );
    }
    this.selectedCourse = -1;
  }
  async giveMarks(formComponent: FormComponent) {
    console.log(formComponent);
    const formGroup:any = formComponent.formGroup.controls;
    const marks = formGroup['Marks'].value;
    if (!marks) {
      this.toaster.error('Form Invalid!');
      return;
    }
    else{
      const data={_studentId:this.selectedStudent,
        _marks:marks,
        courseIndex:Number(this.courseIndex)
      }
      this.contract.addGrades(data)
      console.log('====================================');
      console.log(marks);
      console.log('====================================');
    }
  }
  async getIndex(){
    this.courseIndex = await this.contract.getCourseIndex(this.teacherAssignedCourse);
  }
  async assignAttendance(formComponent: FormComponent) {
    console.log(formComponent);
    const formGroup:any = formComponent.formGroup.controls;
    const attendance = formGroup['Attendance'].value;
    if (!attendance) {
      this.toaster.error('Form Invalid!');
      return;
    }
    else{
      const data={_studentId:this.selectedStudent,
        _attendance:attendance,
        courseIndex:Number(this.courseIndex)
      }
      this.contract.markAttendance(data)
    }
  }
}
