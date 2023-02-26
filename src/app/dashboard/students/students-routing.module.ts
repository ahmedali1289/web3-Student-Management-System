import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { StudentsComponent } from './students.component';

const routes: Routes = [{ path: '', component: StudentsComponent },
{ path: 'add-student', component: AddstudentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
