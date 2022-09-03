import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.isAuthenticated().then((token) => {
        if (!token) {
          this.router.navigate(['auth/login']);
          reject(false);
        } else {
          let userRole = localStorage.getItem('userRole');
          console.log(userRole);
          if (route.data.role == 'Consumer' && userRole == 'Consumer') {
            resolve(true);
          } else if (route.data.role == 'Consumer' && userRole != 'Consumer') {
            this.router.navigate(['auth/userRoleSelection']);
            reject(false);
          } else if (route.data.role == 'Driver' && userRole == 'Driver') {
            resolve(true);
          } else if (route.data.role == 'Driver' && userRole != 'Driver') {
            this.router.navigate(['auth/userRoleSelection']);
            reject(false);
          } else if (
            route.data.role != 'Driver' &&
            route.data.role != 'Consumer'
          ) {
            resolve(true);
          }
        }
      });
    });
  }
}
