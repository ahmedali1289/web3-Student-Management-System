import { Component, Input, ElementRef, Renderer2, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss']
})
export class FlipCardComponent {
@Input() avatar!:string;
@Input() alt!:string;
@Input() heading!:string;
@Input() text!:string;
public width!:number;
public height!:number;
constructor(private elRef: ElementRef, private renderer: Renderer2){}
ngOnInit() {
  const myDiv = this.elRef.nativeElement.querySelector('.flip-card');
  this.width = myDiv.offsetWidth;
  this.height = myDiv.offsetHeight;
}
ngOnChanges(changes: SimpleChanges) {
  console.log(changes, this.text,"hellorees");
  
  if (changes) {
  }
}
}
