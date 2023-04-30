import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { ImageWrapperComponent } from './image-wrapper/image-wrapper.component';
import { TextComponent } from './text/text.component';
import { FlipCardComponent } from './flip-card/flip-card.component';
import { GreetComponent } from './greet/greet.component';
import { FormComponent } from './form/form.component';
import { FilterPipe } from './tableFilter.pipe';
import { LoaderComponent } from './loader/loader.component';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ButtonComponent,
    ImageWrapperComponent,
    TextComponent,
    FlipCardComponent,
    GreetComponent,
    FormComponent,
    FilterPipe,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbTooltip
  ],
  exports:[
    ButtonComponent,
    ImageWrapperComponent,
    TextComponent,
    FlipCardComponent,
    GreetComponent,
    FormComponent,
    FilterPipe,
    LoaderComponent

  ]
})
export class SharedModule { }
