import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignedCourseComponent } from './assigned-course.component';

const routes: Routes = [{ path: '', component: AssignedCourseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignedCourseRoutingModule { }
