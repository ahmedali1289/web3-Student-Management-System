import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const allowedRoles = route.data?.['allowedRoles'];
    const userRole = localStorage.getItem('role')

    if (allowedRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/dashboard/attendance']);
      return false;
    }
  }
}