import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-wrapper',
  templateUrl: './image-wrapper.component.html',
  styleUrls: ['./image-wrapper.component.scss']
})
export class ImageWrapperComponent {
  @Input() image!:string; 
  @Input() alt!:string;
  @Input() width!: number;
  @Input() height!: number;
  @Input() objectFit!: string;
}
