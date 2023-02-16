import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public Data:any = {}
  onValueChange(value: any, field:any) {
    this.Data[field] = value.value;
    console.log('====================================');
    console.log(this.Data);
    console.log('====================================');
  }
  login(){
    console.log('====================================');
    console.log(this.Data,"hjell");
    console.log('====================================');
  }
}
