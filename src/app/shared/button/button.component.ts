import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() onClick!: () => void;

  onClickHandler(): void {
    if (this.onClick) {
      this.onClick();
    }
  }
}
