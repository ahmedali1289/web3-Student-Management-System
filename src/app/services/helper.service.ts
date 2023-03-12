import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private toaster: ToastrService) { }
  showSuccess(toast: string) {
    this.toaster.success(toast);
  }
  showError(toast: any) {
    this.toaster.error(toast);
  }
  extractErrorMessage(errorString: string): string {
    const reasonStartIndex = errorString.indexOf("reverted with reason string '") + "reverted with reason string '".length;
    const reasonEndIndex = errorString.indexOf("'", reasonStartIndex);
    return errorString.slice(reasonStartIndex, reasonEndIndex);
  }
}
