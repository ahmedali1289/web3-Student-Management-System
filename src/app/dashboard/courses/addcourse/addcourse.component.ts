import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract.service';
import { FormComponent } from 'src/app/shared/form/form.component';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export class AddcourseComponent {
  @ViewChild(FormComponent) formComponent!: FormComponent;
  constructor(private contract: ContractService,
    private router:Router){}
    addCourse(){
      this.contract.addCourse({courseName:this.formComponent.formGroup.controls['Course'].value, courseFee:Number(this.formComponent.formGroup.controls['Fee'].value)})
    }
}
