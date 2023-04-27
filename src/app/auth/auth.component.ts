import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthGuardService } from '../services/auth.service';
import { HelperService } from '../services/helper.service';
import { UniversalService } from '../services/universal.service';
import { FormComponent } from '../shared/form/form.component';
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(private authService: AuthGuardService, private router: Router, private api: ApiService, private helper: HelperService) { }
  @ViewChild(FormComponent) formComponent!: FormComponent;
  private subscription!: Subscription;
  login() {
    const formData = this.formComponent.formGroup.value;
    LoaderService.loader.next(true)
    this.subscription = this.api.postMethod(`http://localhost:3000/api/auth/login?email=${formData.Email}&password=${formData.Password}`, {}, false).subscribe((response: any) => {
      this.helper.showSuccess(response?.status)
      this.router.navigate(['/dashboard']);
      this.authService.login(response?.user?.role, response?.token, response?.route)
      UniversalService.sidebar.next(response?.route)
      localStorage.setItem('id',response?.user?.id)
      localStorage.setItem('_id',response?.user?._id)
      LoaderService.loader.next(false)
    }, (error) => {
      this.helper.showError(error?.status)
      LoaderService.loader.next(false)
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
