import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { CoursesComponent } from './courses.component';

const routes: Routes = [{ path: '', component: CoursesComponent },
{ path: 'add-course', component: AddcourseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
