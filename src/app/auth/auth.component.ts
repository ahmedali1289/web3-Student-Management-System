import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthGuardService } from '../services/auth.service';
import { HelperService } from '../services/helper.service';
import { UniversalService } from '../services/universal.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(private authService:AuthGuardService, private router:Router, private api:ApiService, private helper: HelperService){}
  public Data:any = {}
  onValueChange(value: any, field:any) {
    this.Data[field] = value.value;
    console.log('====================================');
    console.log(this.Data);
    console.log('====================================');
  }
  login(){
    this.api.postMethod(`http://localhost:3000/api/auth/login?email=${this.Data.email}&password=${this.Data.password}`,{},false).subscribe((response:any)=>{
      console.log(response);
      this.helper.showSuccess(response?.status)
      this.router.navigate(['/dashboard']);
      this.authService.login(response?.user?.role, response?.token,response?.route)
      UniversalService.sidebar.next(response?.route)
    },(error)=>{
      this.helper.showError(error?.status)
    })
  }
}
