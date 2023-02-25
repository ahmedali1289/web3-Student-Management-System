import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private toaster: ToastrService) { }
  showSuccess(toast:string) {
    this.toaster.success(toast);
  }
  showError(toast:string) {
    this.toaster.error(toast);
  }
}
