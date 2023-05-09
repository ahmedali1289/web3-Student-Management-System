import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContractService } from 'src/app/services/contract.service';
import { FormComponent } from 'src/app/shared/form/form.component';

@Component({
  selector: 'app-addteacher',
  templateUrl: './addteacher.component.html',
  styleUrls: ['./addteacher.component.scss'],
})
export class AddteacherComponent {
  @ViewChild(FormComponent) formComponent!: FormComponent;
  constructor(private contract: ContractService, private router: Router, private toaster:ToastrService) {}
  addTeacher() {
    console.log(this.formComponent);
    const formGroup = this.formComponent.formGroup.controls;
    const name = formGroup['Name'].value;
    const address = formGroup['Address'].value;
    const age = formGroup['Age'].value;
    const number = formGroup['Number'].value;
    const email = formGroup['Email'].value;

    if (!name || !address || !age || !number) {
      this.toaster.error('Form Invalid!');
      return;
    }
    this.contract.addTeacher(name, email, address, Number(age), Number(number));
  }
}
