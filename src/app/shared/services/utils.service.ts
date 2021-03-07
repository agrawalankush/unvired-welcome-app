import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
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
