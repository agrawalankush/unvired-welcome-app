import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router , UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {
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
        if (!isuserLoggedIn) {
          return true;
        }
        this.router.navigate(['/home']);
        // console.log('loggedIn user tring to accss login page');
        return false;
      })
    );
  }
}
