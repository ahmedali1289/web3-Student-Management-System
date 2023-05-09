import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-text',
  template: ''
})
export class TextComponent {
  @Input() tag!: string;
  @Input() text!: any;
  @Input() class!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const element = this.renderer.createElement(this.tag);
    const text = this.renderer.createText(this.text);
    this.renderer.appendChild(element, text);

    if (this.class) {
      const classes = this.class.split(' ');
      classes.forEach(className => {
        this.renderer.addClass(element, className);
      });
    }

    this.renderer.appendChild(this.el.nativeElement, element);
  }
}