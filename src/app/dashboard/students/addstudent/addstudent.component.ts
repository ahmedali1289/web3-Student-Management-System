import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContractService } from 'src/app/services/contract.service';
import { FormComponent } from 'src/app/shared/form/form.component';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss']
})
export class AddstudentComponent {
  @ViewChild(FormComponent) formComponent!: FormComponent;
  constructor(private contract: ContractService,
    private toaster:ToastrService,
    private router:Router){}
    addStudent(){
      console.log(this.formComponent);
      if(this.formComponent.formGroup.controls['Name'].value == null || this.formComponent.formGroup.controls['Name'].value == '' || this.formComponent.formGroup.controls['Address'].value == null || this.formComponent.formGroup.controls['Address'].value == '', this.formComponent.formGroup.controls['Age'].value == null || this.formComponent.formGroup.controls['Age'].value == '' ||  this.formComponent.formGroup.controls['Number'].value == null || this.formComponent.formGroup.controls['Number'].value == ''){
        this.toaster.error('Form Invalid!')
        return;
      }
      else{
        this.contract.addStudent(this.formComponent.formGroup.controls['Name'].value, this.formComponent.formGroup.controls['Address'].value, Number(this.formComponent.formGroup.controls['Age'].value), Number(this.formComponent.formGroup.controls['Number'].value))
      }
    }
}
