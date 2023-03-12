import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from 'src/app/services/contract.service';
import { FormComponent } from 'src/app/shared/form/form.component';

@Component({
  selector: 'app-addteacher',
  templateUrl: './addteacher.component.html',
  styleUrls: ['./addteacher.component.scss']
})
export class AddteacherComponent {
  @ViewChild(FormComponent) formComponent!: FormComponent;
  constructor(private contract: ContractService,
    private router: Router) { }
  addTeacher() {
    this.contract.addTeacher(this.formComponent.formGroup.controls['Name'].value, this.formComponent.formGroup.controls['Address'].value, Number(this.formComponent.formGroup.controls['Age'].value), Number(this.formComponent.formGroup.controls['Number'].value))
  }
}
