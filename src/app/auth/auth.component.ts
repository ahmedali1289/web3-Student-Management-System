import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthGuardService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(private authService:AuthGuardService, private router:Router, private api:ApiService){}
  public Data:any = {}
  onValueChange(value: any, field:any) {
    this.Data[field] = value.value;
    console.log('====================================');
    console.log(this.Data);
    console.log('====================================');
  }
  login(){
    this.api.postMethod('http://localhost:3000/api/login', this.Data, false).subscribe(res=>{
      console.log('====================================');
      console.log(res);
      console.log('====================================');
    })
    // this.router.navigate(['/dashboard']);
    // this.authService.login('dashboard')
  }
}
