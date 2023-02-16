import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() label: any;
  @Input() type: any;
  @Output() valueChange = new EventEmitter<string>();

  onInputChange(value: any) {
    this.valueChange.emit(value);
  }
}
