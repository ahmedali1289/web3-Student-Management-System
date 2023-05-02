import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthGuardService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UniversalService } from 'src/app/services/universal.service';
import { FormComponent } from 'src/app/shared/form/form.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  @ViewChild(FormComponent) formComponent!: FormComponent;
  private subscription!: Subscription;
  constructor(private authService: AuthGuardService, private router: Router, private api: ApiService, private helper: HelperService) {
  }

  changePassword() {
    const formData = this.formComponent.formGroup.value;
    LoaderService.loader.next(true)
    this.subscription = this.api.postMethod(`http://localhost:3000/api/auth/change-password?id=${localStorage.getItem('_id')}&oldPassword=${formData['Old Password']}&newPassword=${formData['New Password']}`, {}, false).subscribe((response: any) => {
      this.helper.showSuccess(response?.status)
      this.router.navigate(['/dashboard']);
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
