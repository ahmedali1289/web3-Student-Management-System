import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
export interface Course {
  id: number;
  name: string;
  fee: number;
}
export interface AssignedCourse {
  id: number;
}
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
  removeItemsFromArray(mainArray: Course[], secondaryArray: AssignedCourse[]): Course[] {
    const secondaryIds = secondaryArray.map((item) => item.id);
    return mainArray.filter((item) => !secondaryIds.includes(item.id));
  }
}
