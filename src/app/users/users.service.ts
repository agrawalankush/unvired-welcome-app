import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { UtilsService } from '../shared/services/utils.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  private baseurl = '/api/users';
  constructor(private http: HttpClient, private utilservice: UtilsService) { }

  public getallusers(pageIndex: number, pageSize: number) {
    const params = new HttpParams()
    .set('pageIndex', pageIndex.toString())
    .set('pageSize', pageSize.toString());
    return this.http.get(`${this.baseurl}/all`, {params}).pipe(
      retry(1),
      catchError(this.utilservice.handleError)
    );
  }
}
