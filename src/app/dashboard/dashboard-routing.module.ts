import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { RoleGuard } from '../guards/role.guard';

const routes: Routes = [{ path: '', component: DashboardComponent, children: [
  { path: '', redirectTo: 'over-view', pathMatch: 'full' },
  { path: 'over-view', component: OverviewComponent,
  canActivate: [RoleGuard],
  data: { allowedRoles: ['admin'] } },
  { path: 'attendance', component: OverviewComponent,
  canActivate: [RoleGuard],
  data: { allowedRoles: ['admin','teacher','student'] } },
  { path: 'students', canActivate: [RoleGuard],
  data: { allowedRoles: ['admin','teacher'] }, loadChildren: () => import('./students/students.module').then(m => m.StudentsModule) },
  { path: 'courses', canActivate: [RoleGuard],
  data: { allowedRoles: ['admin','teacher', 'student'] }, loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) },
  { path: 'teachers', canActivate: [RoleGuard],
  data: { allowedRoles: ['admin'] }, loadChildren: () => import('./teachers/teachers.module').then(m => m.TeachersModule) },
  { path: 'assign-courses', loadChildren: () => import('./assigned-course/assigned-course.module').then(m => m.AssignedCourseModule) },
  { path: 'change-password', canActivate: [RoleGuard],
  data: { allowedRoles: ['teacher','student'] }, loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule) }
]}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
 }
