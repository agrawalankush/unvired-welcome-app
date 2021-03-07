import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  private baseurl = '/api/users';
  constructor(private http: HttpClient) { }

  public getallusers(pageIndex: number, pageSize: number) {
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString());
    return this.http.get(`${this.baseurl}/all`, {params}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);

      // return an observable with a user-facing error message
      return throwError(
        'Your network is playing tricks on you, please fix and try again!');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.msg}`);
      return throwError(
          `${error.error.msg}`);
        }
    }
}
