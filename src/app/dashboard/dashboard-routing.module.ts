import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [{ path: '', component: DashboardComponent, children: [
  { path: '', redirectTo: 'over-view', pathMatch: 'full' },
  { path: 'over-view', component: OverviewComponent },
  { path: 'students', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule) },
]}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
