import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContractService } from 'src/app/services/contract.service';
import { FormComponent } from 'src/app/shared/form/form.component';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss'],
})
export class AddstudentComponent {
  @ViewChild(FormComponent) formComponent!: FormComponent;
  constructor(
    private contract: ContractService,
    private toaster: ToastrService,
    private router: Router
  ) {
    console.log(this.formComponent);
  }
  addStudent() {
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
    this.contract.addStudent(name, email, address, Number(age), Number(number));
  }
}
