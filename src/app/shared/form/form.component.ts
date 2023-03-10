import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() fields!: string[];
  @Input() fieldTypes!: string[];
  @Input() error!: boolean;
  @Output() formData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formGroupErrors: EventEmitter<any> = new EventEmitter<any>();
  formGroup!: FormGroup;
  show:boolean = false;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.formGroup = this.fb.group({});
    this.fields.forEach(field => {
      if(field === 'email' && this.error == true){
        this.formGroup.addControl(field, this.fb.control(null, [Validators.required, Validators.email]));
      }
      else if(this.error == true){
        this.formGroup.addControl(field, this.fb.control(null, [Validators.required]));
      }
      else{
        this.formGroup.addControl(field, this.fb.control(null));
      }
    });
  }
}