import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignedCourseRoutingModule } from './assigned-course-routing.module';
import { AssignedCourseComponent } from './assigned-course.component';


@NgModule({
  declarations: [
    AssignedCourseComponent
  ],
  imports: [
    CommonModule,
    AssignedCourseRoutingModule
  ]
})
export class AssignedCourseModule { }
