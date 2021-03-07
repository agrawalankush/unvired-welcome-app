import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {  catchError, retry, tap } from 'rxjs/operators';
import { UtilsService } from '../shared/services/utils.service';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  private authbaseurl = '/api/users';
  constructor(private http: HttpClient,
              private router: Router,
              private utilservice: UtilsService) { }
  login(loginform: any) {
    return this.http.post(`${this.authbaseurl}/login`, loginform, this.httpOptions).pipe(
      tap(res => this.storeTokenAndlogIn(res)),
      retry(1),
      catchError(this.utilservice.handleError)
    );
  }
  get isLoggedIn() {
    const Token = localStorage.getItem('jwttoken');
    if (Token) {
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }
  storeTokenAndlogIn(jwtres) {
    localStorage.setItem('jwttoken', jwtres.token);
    localStorage.setItem('expiresIn', jwtres.expiresIn);
    this.loggedIn.next(true);
  }
  decode() {
    return decode(localStorage.getItem('jwttoken'));
  }
  removeTokenAndlogOut() {
    localStorage.removeItem('jwttoken');
    localStorage.removeItem('expiresIn');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
