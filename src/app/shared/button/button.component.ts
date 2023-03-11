import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  constructor(private modalService:NgbModal){}
  @Input() text!: string;
  @Input() onClick!: any;
  @Input() content!: any;
  onClickHandler(): void {
    if (this.onClick) {
      this.onClick();
    }
  }
  openModal(): void {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
