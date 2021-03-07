import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
// import { map, take } from 'rxjs/operators';
import decode from 'jwt-decode';
import { MatSnackBarComponent } from '../shared/components/mat-snack-bar/mat-snack-bar.component';
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  public user: any ;
  constructor(
              private snackBar: MatSnackBarComponent,
              private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.user = decode(localStorage.getItem('jwttoken'));
    // console.log(this.user, next.data.role);
    if (this.user.role === next.data.role) {
      return true;
    }
    this.snackBar.openSnackBar('You are not authorized to access audits!!', '', 'red-snackbar');
    return false;
  }
}
