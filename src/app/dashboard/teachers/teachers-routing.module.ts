import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddteacherComponent } from './addteacher/addteacher.component';
import { TeachersComponent } from './teachers.component';

const routes: Routes = [{ path: '', component: TeachersComponent },
{ path: 'add-teacher', component: AddteacherComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
