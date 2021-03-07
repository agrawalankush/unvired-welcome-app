import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authservice: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authservice.isLoggedIn.pipe(
      take(1),
      map((isuserLoggedIn: boolean) => {
        // console.log(isuserLoggedIn);
        if (isuserLoggedIn) {
          return true;
        }
        this.router.navigate(['/login']);
         // console.log('accessing admin routes without logging in');
        return false;
      })
    );
  }
}
