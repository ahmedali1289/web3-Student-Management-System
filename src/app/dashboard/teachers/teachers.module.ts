import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { AddteacherComponent } from './addteacher/addteacher.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    TeachersComponent,
    AddteacherComponent
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgbTooltipModule,
    NgSelectModule,
    NgbModule
  ]
})
export class TeachersModule { }
