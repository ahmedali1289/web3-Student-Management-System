import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(private authService:AuthGuardService, private router:Router){}
  public Data:any = {}
  onValueChange(value: any, field:any) {
    this.Data[field] = value.value;
    console.log('====================================');
    console.log(this.Data);
    console.log('====================================');
  }
  login(){
    this.authService.login('dashboard')
    this.router.navigate(['/dashboard']);
  }
}
